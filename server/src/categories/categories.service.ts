import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Difficulty, DifficultyEnum } from 'src/entities/difficulty.entity';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async getCategories() {
    return await this.categoryRepository.find();
  }

  async getDifficulties() {
    return await this.difficultyRepository.find();
  }

  async getQuestionsForCategory(
    categoryName: string,
    difficultyName: DifficultyEnum,
  ) {
    return await this.questionRepository
      .createQueryBuilder('question')
      .select(['question.id', 'question.name', 'question.answer'])
      .innerJoin('question.category', 'category')
      .innerJoin('question.difficulty', 'difficulty')
      .where('category.name = :categoryName', { categoryName })
      .andWhere('difficulty.name = :difficultyName', { difficultyName })
      .getMany();
  }
}
