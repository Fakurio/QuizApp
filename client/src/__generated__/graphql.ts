/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  __typename?: 'Answer';
  correct: Scalars['String']['output'];
  incorrect: Array<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Difficulty = {
  __typename?: 'Difficulty';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type GameInput = {
  categoryName: Scalars['String']['input'];
  difficultyName: Scalars['String']['input'];
  gameCode: Scalars['String']['input'];
  gameMode: GameMode;
};

export enum GameMode {
  Multiplayer = 'Multiplayer',
  Solo = 'Solo'
}

export type Mutation = {
  __typename?: 'Mutation';
  createGame?: Maybe<Scalars['Boolean']['output']>;
  stopGame?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateGameArgs = {
  gameData: GameInput;
};


export type MutationStopGameArgs = {
  gameCode: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  difficulties: Array<Difficulty>;
};

export type Question = {
  __typename?: 'Question';
  answer: Answer;
  duration: Scalars['Int']['output'];
  gameCode: Scalars['String']['output'];
  latency: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  questionAmount?: Maybe<Scalars['Int']['output']>;
  startTime: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newQuestion: Question;
};


export type SubscriptionNewQuestionArgs = {
  gameCode: Scalars['String']['input'];
};

export type CreateGameMutationVariables = Exact<{
  gameData: GameInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame?: boolean | null };

export type OnNewQuestionSubscriptionVariables = Exact<{
  gameCode: Scalars['String']['input'];
}>;


export type OnNewQuestionSubscription = { __typename?: 'Subscription', newQuestion: { __typename?: 'Question', name: string, startTime: string, duration: number, latency: number, questionAmount?: number | null, answer: { __typename?: 'Answer', correct: string, incorrect: Array<string> } } };

export type GetDifficultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDifficultiesQuery = { __typename?: 'Query', difficulties: Array<{ __typename?: 'Difficulty', id: number, name: string }> };

export type StopGameMutationVariables = Exact<{
  gameCode: Scalars['String']['input'];
}>;


export type StopGameMutation = { __typename?: 'Mutation', stopGame?: boolean | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string, logo: string }> };


export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameData"}}}]}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const OnNewQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnNewQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"answer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"incorrect"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"latency"}},{"kind":"Field","name":{"kind":"Name","value":"questionAmount"}}]}}]}}]} as unknown as DocumentNode<OnNewQuestionSubscription, OnNewQuestionSubscriptionVariables>;
export const GetDifficultiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDifficulties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"difficulties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetDifficultiesQuery, GetDifficultiesQueryVariables>;
export const StopGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}}}]}]}}]} as unknown as DocumentNode<StopGameMutation, StopGameMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;