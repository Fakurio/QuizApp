import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Game } from './game.entity';
import { PlayerAnswers } from './player-answers.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl: string | null;

  @Column({ nullable: true })
  refreshToken: string | null;

  @OneToMany(() => Game, (game) => game.playerOne)
  gamesAsPlayerOne: Game[];

  @OneToMany(() => Game, (game) => game.playerTwo)
  gamesAsPlayerTwo: Game[];

  @OneToMany(() => PlayerAnswers, (playerAnswers) => playerAnswers.player)
  playerAnswers: PlayerAnswers[];
}
