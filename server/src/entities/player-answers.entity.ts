import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { GameQuestions } from './game-questions.entity';

@Entity()
export class PlayerAnswers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => User, (user) => user.playerAnswers)
  player: User;

  @ManyToOne(
    () => GameQuestions,
    (gameQuestions) => gameQuestions.playerAnswers,
    { onDelete: 'CASCADE' },
  )
  gameQuestion: GameQuestions;
}
