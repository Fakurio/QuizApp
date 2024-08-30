import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Difficulty } from './difficulty.entity';
import { Category } from './category.entity';
import { GameQuestions } from './game-questions.entity';
import { AnswerI } from 'src/interfaces/answer-interface';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'json' })
  answer: AnswerI;

  @ManyToOne(() => Difficulty, (difficulty) => difficulty.questions, {
    onDelete: 'CASCADE',
  })
  difficulty: Difficulty;

  @ManyToOne(() => Category, (category) => category.questions, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => GameQuestions, (gameQuestions) => gameQuestions.question)
  games: GameQuestions[];
}
