import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateGameDTO } from './dto/create-game.dto';
import { DifficultyEnum } from 'src/entities/difficulty.entity';
import { Question } from 'src/entities/question.entity';
import { ConfigService } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class GamesService {
  constructor(
    private categoryService: CategoriesService,
    private configService: ConfigService,
    @Inject('PUB_SUB')
    private pubSub: PubSub,
  ) {}
  async createGame(gameData: CreateGameDTO) {
    console.log(gameData);
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
    this.sendQuestion(questions[0], gameCode, questions.length);
    questions.shift();
    const stopGameID = setInterval(
      () => {
        if (questions.length > 0) {
          this.sendQuestion(questions[0], gameCode);
          questions.shift();
        } else {
          clearInterval(stopGameID);
        }
      },
      this.configService.get('ROUND_DURATION') * 1000 +
        this.configService.get('LATENCY_BUFFER') * 1000,
    );
  }

  private sendQuestion(
    question: Question,
    gameCode: string,
    questionAmount?: number,
    startTime: number = Date.now(),
    duration = this.configService.get('ROUND_DURATION') * 1000 +
      this.configService.get('LATENCY_BUFFER') * 1000,
  ) {
    console.log('Sending question');
    if (questionAmount) {
      this.pubSub.publish('newQuestion', {
        newQuestion: {
          ...question,
          gameCode,
          questionAmount,
          startTime,
          duration,
        },
      });
    } else {
      this.pubSub.publish('newQuestion', {
        newQuestion: { ...question, gameCode, startTime, duration },
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
