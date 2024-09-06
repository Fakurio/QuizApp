import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateGameDTO } from './dto/create-game.dto';
import { DifficultyEnum } from 'src/entities/difficulty.entity';
import { Question } from 'src/entities/question.entity';
import { ConfigService } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';
import { ActiveGame } from 'src/interfaces/active-game-interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { GameMode, PlayerAnswers, SeekGameInput } from 'src/schema-graphql';
import { PlayerAnswers as PlayerAnswersEntity } from 'src/entities/player-answers.entity';
import { SeekGame } from 'src/interfaces/seek-game-interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamesService {
  private activeGames: Map<string, ActiveGame>;
  private seekGames: Map<string, SeekGame>;
  constructor(
    private categoryService: CategoriesService,
    private configService: ConfigService,

    @Inject('PUB_SUB')
    private pubSub: PubSub,

    @InjectRepository(Game)
    private gameRepository: Repository<Game>,

    @InjectRepository(PlayerAnswersEntity)
    private playerAnswersRepository: Repository<PlayerAnswersEntity>,
  ) {
    this.activeGames = new Map();
    this.seekGames = new Map();
    this.populateSeekGamesMap();
  }

  async createGame(gameData: CreateGameDTO, user: User | null) {
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

    if (!user) {
      this.startGame(gameData.gameCode, randomQuestions);
    } else if (gameData.gameMode === GameMode.Solo) {
      this.openSoloGame(
        gameData.gameCode,
        randomQuestions,
        user,
        gameData.categoryName,
      );
    } else {
      console.log('Gra multi', gameData);
      // this.openMultiplayerGame(gameData.gameCode, randomQuestions, user);
    }
  }

  endRound(gameCode: string) {
    console.log('Koniec rundy', gameCode);
    const game = this.activeGames.get(gameCode);
    if (!game) {
      return;
    }
    clearInterval(game.timerID);
    this.sendNextQuestion(gameCode);
    this.startRoundTimer(gameCode);
  }

  stopGame(gameCode: string) {
    console.log('Gra stop', gameCode);
    const game = this.activeGames.get(gameCode);
    if (game) {
      clearInterval(game.timerID);
      this.activeGames.delete(gameCode);
    }
  }

  async savePlayerAnswers(
    user: User,
    gameCode: string,
    playerAnswers: PlayerAnswers[],
    playerScore: number,
  ) {
    const game = await this.gameRepository.findOne({
      where: { gameCode },
    });
    game.playerOneScore = playerScore;
    game.isFinished = true;
    await this.gameRepository.save(game);
    for (const playerAnswer of playerAnswers) {
      const answer = new PlayerAnswersEntity();
      answer.game = game;
      answer.isCorrect = playerAnswer.isCorrect;
      answer.player = user;
      answer.question = await this.categoryService.getQuestionByID(
        playerAnswer.questionID,
      );
      await this.playerAnswersRepository.save(answer);
    }
  }

  async seekGame(user: User, seekGameInput: SeekGameInput) {
    const { categoryName, difficultyName } = seekGameInput;
    let playersIDs: number[];
    try {
      playersIDs = this.seekGames.get(categoryName)[difficultyName];
    } catch (e) {
      throw new BadRequestException('Category not found');
    }
    if (playersIDs.length >= 1) {
      const gameData = new CreateGameDTO();
      gameData.categoryName = categoryName;
      gameData.difficultyName = difficultyName;
      gameData.gameMode = GameMode.Multiplayer;
      gameData.playerOneID = playersIDs.shift();
      gameData.playerTwoID = user.id;
      gameData.gameCode = uuidv4();
      this.createGame(gameData, user);
    } else {
      playersIDs.push(user.id);
    }
    console.log(this.seekGames);
  }

  async cancelSeekingGame(user: User, seekGameInput: SeekGameInput) {
    const { categoryName, difficultyName } = seekGameInput;
    const playersIDs = this.seekGames.get(categoryName)[difficultyName];
    playersIDs.splice(playersIDs.indexOf(user.id), 1);
    console.log(this.seekGames);
  }

  private async openSoloGame(
    gameCode: string,
    questions: Question[],
    user: User,
    categoryName: string,
  ) {
    const game = new Game();
    game.gameCode = gameCode;
    game.playerOne = user;
    game.isFinished = false;
    game.category = await this.categoryService.getCategoryByName(categoryName);
    await this.gameRepository.save(game);
    this.startGame(gameCode, questions);
  }

  private startGame(gameCode: string, questions: Question[]) {
    console.log('Gra start', gameCode);
    this.activeGames.set(gameCode, { questions, timerID: null });
    this.sendNextQuestion(gameCode, questions.length);
    this.startRoundTimer(gameCode);
  }

  private sendNextQuestion(gameCode: string, questionAmount?: number) {
    const game = this.activeGames.get(gameCode);
    if (!game) {
      return;
    }
    const nextQuestion = game.questions.shift();
    if (!nextQuestion) {
      console.log('Koniec gry', gameCode);
      this.stopGame(gameCode);
      return;
    }
    console.log('Następne pytanie', gameCode);
    this.sendQuestion(nextQuestion, gameCode, questionAmount);
  }

  private startRoundTimer(gameCode: string) {
    if (!this.activeGames.get(gameCode)) {
      return;
    }
    const stopRound = setInterval(
      () => {
        this.sendNextQuestion(gameCode);
      },
      this.configService.get('ROUND_DURATION') * 1000 +
        this.configService.get('LATENCY_BUFFER') * 1000,
    );
    this.activeGames.get(gameCode).timerID = stopRound;
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

  private async populateSeekGamesMap() {
    const categories = await this.categoryService.getCategories();
    const difficulties = await this.categoryService.getDifficulties();
    for (const category of categories) {
      for (const diff of difficulties) {
        const prev = this.seekGames.get(category.name);
        this.seekGames.set(category.name, { ...prev, [diff.name]: [] });
      }
    }
  }
}
