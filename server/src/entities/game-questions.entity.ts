import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';
import { Question } from './question.entity';
import { PlayerAnswers } from './player-answers.entity';

@Entity()
export class GameQuestions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, (game) => game.questions, { onDelete: 'CASCADE' })
  game: Game;

  @ManyToOne(() => Question, (question) => question.games, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @OneToMany(() => PlayerAnswers, (playerAnswers) => playerAnswers.gameQuestion)
  playerAnswers: PlayerAnswers[];
}
