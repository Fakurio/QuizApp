import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { GameQuestions } from './game-questions.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameCode: string;

  @Column()
  isFinished: boolean;

  @Column({ default: 0 })
  playerOneScore: number;

  @Column({ default: 0 })
  playerTwoScore: number;

  @ManyToOne(() => User, (user) => user.gamesAsPlayerOne)
  playerOne: User;

  @ManyToOne(() => User, (user) => user.gamesAsPlayerTwo)
  playerTwo: User;

  @OneToMany(() => GameQuestions, (gameQuestions) => gameQuestions.game)
  questions: GameQuestions[];
}
