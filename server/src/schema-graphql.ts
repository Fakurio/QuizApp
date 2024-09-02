
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum GameMode {
    Solo = "Solo",
    Multiplayer = "Multiplayer"
}

export class GameInput {
    categoryName: string;
    difficultyName: string;
    gameCode: string;
    gameMode: GameMode;
}

export class PlayerAnswers {
    questionID: number;
    isCorrect: boolean;
}

export class Category {
    id: number;
    name: string;
    logo: string;
}

export class Difficulty {
    id: number;
    name: string;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;

    abstract difficulties(): Difficulty[] | Promise<Difficulty[]>;

    abstract getUserGamesHistory(): History[] | Promise<History[]>;
}

export class Answer {
    correct: string;
    incorrect: string[];
}

export class Question {
    id: number;
    gameCode: string;
    name: string;
    answer: Answer;
    startTime: string;
    duration: number;
    latency: number;
    questionAmount?: Nullable<number>;
}

export abstract class IMutation {
    abstract createGame(gameData: GameInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createSoloGame(gameData: GameInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createMutliplayerGame(gameData: GameInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract sendGameSummary(gameCode: string, playerAnswers: PlayerAnswers[], playerScore: number): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract stopGame(gameCode: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract endRound(gameCode: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export abstract class ISubscription {
    abstract newQuestion(gameCode: string): Question | Promise<Question>;
}

export class HistoryQuestion {
    questionName: string;
    isCorrectlyAnswered: boolean;
}

export class History {
    id: number;
    categoryName: string;
    questions: HistoryQuestion[];
}

type Nullable<T> = T | null;
