import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

export enum DifficultyEnum {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity()
export class Difficulty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DifficultyEnum })
  name: DifficultyEnum;

  @OneToMany(() => Question, (question) => question.difficulty)
  questions: Question[];
}
