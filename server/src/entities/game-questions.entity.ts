import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';
import { Question } from './question.entity';

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
}
