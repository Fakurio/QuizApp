import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { Game } from './game.entity';

@Entity()
export class PlayerAnswers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => User, (user) => user.playerAnswers)
  player: User;

  @ManyToOne(() => Question, (question) => question.playerAnswers)
  question: Question;

  @ManyToOne(() => Game, (game) => game.playerAnswers, { onDelete: 'CASCADE' })
  game: Game;
}
