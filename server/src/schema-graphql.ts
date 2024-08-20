
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
}

export abstract class IMutation {
    abstract createGame(gameData: GameInput): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
