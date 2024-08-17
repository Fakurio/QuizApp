
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Category {
    id: number;
    name: string;
    logo: string;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;
}

type Nullable<T> = T | null;
