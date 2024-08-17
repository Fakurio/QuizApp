import { Seeder } from 'nestjs-seeder';
import { readFileSync } from 'fs';
import { DifficultyEnum, Difficulty } from 'src/entities/difficulty.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonDataI } from 'src/interfaces/json-data-interface';
import { Category } from 'src/entities/category.entity';
import { Question } from 'src/entities/question.entity';

export class CategoryQuestionSeeder implements Seeder {
  constructor(
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async seed(): Promise<any> {
    for (const difficulty of Object.values(DifficultyEnum)) {
      const diff = new Difficulty();
      diff.name = difficulty;
      await this.difficultyRepository.save(diff);
    }

    const rawData = readFileSync('src/seeders/questions.json', 'utf8');
    const data: JsonDataI = JSON.parse(rawData);
    for (const categoryName of Object.keys(data)) {
      const category = new Category();
      category.name = categoryName;
      category.logo = data[categoryName].logo;
      category.questions = [];
      for (const difficultyName of Object.keys(data[categoryName])) {
        if (difficultyName === 'logo') continue;
        const difficulty = await this.difficultyRepository.findOne({
          where: { name: DifficultyEnum[difficultyName.toUpperCase()] },
        });
        for (const questionData of data[categoryName][difficultyName]) {
          const question = new Question();
          question.name = questionData.question;
          question.answer = {
            correct: questionData.correct_answer,
            incorrect: questionData.incorrect_answers,
          };
          question.category = category;
          question.difficulty = difficulty;
          category.questions.push(question);
        }
      }
      await this.categoryRepository.save(category);
    }
  }

  async drop(): Promise<any> {}
}
