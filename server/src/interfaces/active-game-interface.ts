import { Question } from 'src/entities/question.entity';
import { GameMode } from 'src/schema-graphql';

interface CurrentAnswer {
  playerID: number;
  isCorrect: boolean;
}

export interface ActiveGame {
  questions: Question[];
  timerID: NodeJS.Timeout;
  gameMode: GameMode;
  numberOfAnswers?: number;
  playerOneCurrentAnswer?: CurrentAnswer;
  playerTwoCurrentAnswer?: CurrentAnswer;
}
