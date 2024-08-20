import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Difficulty } from 'src/entities/difficulty.entity';
import { Question } from 'src/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Difficulty, Question])],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
