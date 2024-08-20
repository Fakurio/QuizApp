import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateGameDTO } from './dto/create-game.dto';
import { DifficultyEnum } from 'src/entities/difficulty.entity';
import { Question } from 'src/entities/question.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GamesService {
  constructor(
    private categoryService: CategoriesService,
    private configService: ConfigService,
  ) {}
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
    console.log('questions', questions);
    const randomQuestions = this.getRandomQuestions(
      questions,
      this.configService.get('QUESTIONS_PER_GAME'),
    );
    console.log('randomQuestions', randomQuestions);
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
