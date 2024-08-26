import { Question } from 'src/entities/question.entity';

export interface ActiveGame {
  questions: Question[];
  timerID: NodeJS.Timeout;
}
