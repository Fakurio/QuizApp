import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { PlayerAnswers } from './player-answers.entity';

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

  @ManyToOne(() => Category, (category) => category.games)
  category: Category;

  @OneToMany(() => PlayerAnswers, (playerAnswer) => playerAnswer.game)
  playerAnswers: PlayerAnswers[];
}
