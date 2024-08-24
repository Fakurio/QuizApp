import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateGameDTO } from './dto/create-game.dto';
import { DifficultyEnum } from 'src/entities/difficulty.entity';
import { Question } from 'src/entities/question.entity';
import { ConfigService } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class GamesService {
  private activeGames: Map<string, NodeJS.Timeout>;
  constructor(
    private categoryService: CategoriesService,
    private configService: ConfigService,
    @Inject('PUB_SUB')
    private pubSub: PubSub,
  ) {
    this.activeGames = new Map();
  }
  async createGame(gameData: CreateGameDTO) {
    const questions = await this.categoryService.getQuestionsForCategory(
      gameData.categoryName,
      DifficultyEnum[gameData.difficultyName.toUpperCase()],
    );
    if (questions.length === 0) {
      throw new BadRequestException(
        'No questions found for this category and difficulty',
      );
    }
    const randomQuestions = this.getRandomQuestions(
      questions,
      this.configService.get('QUESTIONS_PER_GAME'),
    );
    this.startGame(gameData.gameCode, randomQuestions);
  }

  private startGame(gameCode: string, questions: Question[]) {
    console.log('Gra start', gameCode);

    this.sendQuestion(questions[0], gameCode, questions.length);
    questions.shift();

    let stopGameID: NodeJS.Timeout;

    const sendNextQuestion = () => {
      if (questions.length > 0) {
        console.log('Następne pytanie', gameCode);
        this.sendQuestion(questions[0], gameCode);
        questions.shift();
      } else {
        console.log('Koniec gry', gameCode);
        this.stopGame(gameCode);
      }
    };

    const startQuestionTimer = () => {
      stopGameID = setInterval(
        sendNextQuestion,
        this.configService.get('ROUND_DURATION') * 1000 +
          this.configService.get('LATENCY_BUFFER') * 1000,
      );
      this.activeGames.set(gameCode, stopGameID);
    };

    startQuestionTimer();
  }

  stopGame(gameCode: string) {
    console.log('Gra stop', gameCode);
    clearInterval(this.activeGames.get(gameCode));
    this.activeGames.delete(gameCode);
    console.log(this.activeGames);
  }

  private sendQuestion(
    question: Question,
    gameCode: string,
    questionAmount?: number,
    startTime: number = Date.now(),
    duration = +this.configService.get('ROUND_DURATION'),
    latency = +this.configService.get('LATENCY_BUFFER'),
  ) {
    if (questionAmount) {
      this.pubSub.publish('newQuestion', {
        newQuestion: {
          ...question,
          gameCode,
          questionAmount,
          startTime,
          duration,
          latency,
        },
      });
    } else {
      this.pubSub.publish('newQuestion', {
        newQuestion: { ...question, gameCode, startTime, duration, latency },
      });
    }
  }

  private getRandomQuestions(questions: Question[], limit: number) {
    let i = questions.length;
    let j: number;
    let temp: Question;
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = questions[j];
      questions[j] = questions[i];
      questions[i] = temp;
    }
    return questions.slice(0, limit);
  }
}
