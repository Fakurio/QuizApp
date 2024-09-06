
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

export class SeekGameInput {
    categoryName: string;
    difficultyName: string;
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

    abstract getUserGamesHistory(offset?: Nullable<number>, limit?: Nullable<number>): History | Promise<History>;
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

export class OpponentFound {
    playerOneID: number;
    playerTwoID: number;
    gameCode: string;
}

export abstract class IMutation {
    abstract createGame(gameData: GameInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createSoloGame(gameData: GameInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createMutliplayerGame(gameData: GameInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract seekGame(seekGameInput: SeekGameInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract cancelSeekingGame(seekGameInput: SeekGameInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract sendGameSummary(gameCode: string, playerAnswers: PlayerAnswers[], playerScore: number): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract stopGame(gameCode: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract endRound(gameCode: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export abstract class ISubscription {
    abstract newQuestion(gameCode: string): Question | Promise<Question>;

    abstract opponentFound(playerID: number): OpponentFound | Promise<OpponentFound>;
}

export class HistoryQuestion {
    questionName: string;
    isCorrectlyAnswered: boolean;
}

export class HistoryInput {
    id: number;
    categoryName: string;
    questions: HistoryQuestion[];
}

export class History {
    totalCount: number;
    history: HistoryInput[];
}

type Nullable<T> = T | null;
