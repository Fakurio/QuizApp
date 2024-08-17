export interface JsonDataI {
  [key: string]: CategoryDataI;
}

export interface CategoryDataI {
  logo: string;
  easy: QuestionI[];
  medium: QuestionI[];
  hard: QuestionI[];
}

export interface QuestionI {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
