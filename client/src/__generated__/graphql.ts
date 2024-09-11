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

export type CurrentAnswer = {
  isCorrect: Scalars['Boolean']['input'];
  playerID: Scalars['Int']['input'];
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

export type History = {
  __typename?: 'History';
  history: Array<HistoryInput>;
  totalCount: Scalars['Int']['output'];
};

export type HistoryInput = {
  __typename?: 'HistoryInput';
  categoryName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  opponentName?: Maybe<Scalars['String']['output']>;
  questions: Array<HistoryQuestion>;
};

export type HistoryQuestion = {
  __typename?: 'HistoryQuestion';
  isCorrectlyAnswered: Scalars['Boolean']['output'];
  questionName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelSeekingGame?: Maybe<Scalars['Boolean']['output']>;
  createGame?: Maybe<Scalars['Boolean']['output']>;
  createMutliplayerGame?: Maybe<Scalars['Boolean']['output']>;
  createSoloGame?: Maybe<Scalars['Boolean']['output']>;
  endRound?: Maybe<Scalars['Boolean']['output']>;
  seekGame?: Maybe<Scalars['Boolean']['output']>;
  sendGameSummary?: Maybe<Scalars['Boolean']['output']>;
  stopGame?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCancelSeekingGameArgs = {
  seekGameInput: SeekGameInput;
};


export type MutationCreateGameArgs = {
  gameData: GameInput;
};


export type MutationCreateMutliplayerGameArgs = {
  gameData: GameInput;
};


export type MutationCreateSoloGameArgs = {
  gameData: GameInput;
};


export type MutationEndRoundArgs = {
  currentAnswer?: InputMaybe<CurrentAnswer>;
  gameCode: Scalars['String']['input'];
};


export type MutationSeekGameArgs = {
  seekGameInput: SeekGameInput;
};


export type MutationSendGameSummaryArgs = {
  gameCode: Scalars['String']['input'];
  playerAnswers: Array<PlayerAnswers>;
  playerScore: Scalars['Int']['input'];
};


export type MutationStopGameArgs = {
  gameCode: Scalars['String']['input'];
};

export type OpponentAnswer = {
  __typename?: 'OpponentAnswer';
  gameCode: Scalars['String']['output'];
  isCorrect: Scalars['Boolean']['output'];
  playerID: Scalars['Int']['output'];
};

export type OpponentFound = {
  __typename?: 'OpponentFound';
  gameCode: Scalars['String']['output'];
  playerOneID: Scalars['Int']['output'];
  playerTwoID: Scalars['Int']['output'];
};

export type PlayerAnswers = {
  isCorrect: Scalars['Boolean']['input'];
  questionID: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  difficulties: Array<Difficulty>;
  getUserGamesHistory: History;
};


export type QueryGetUserGamesHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Question = {
  __typename?: 'Question';
  answer: Answer;
  duration: Scalars['Int']['output'];
  gameCode: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latency: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  questionAmount?: Maybe<Scalars['Int']['output']>;
  startTime: Scalars['String']['output'];
};

export type SeekGameInput = {
  categoryName: Scalars['String']['input'];
  difficultyName: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newQuestion: Question;
  opponentAnswer: OpponentAnswer;
  opponentFound: OpponentFound;
};


export type SubscriptionNewQuestionArgs = {
  gameCode: Scalars['String']['input'];
};


export type SubscriptionOpponentAnswerArgs = {
  gameCode: Scalars['String']['input'];
  playerID: Scalars['Int']['input'];
};


export type SubscriptionOpponentFoundArgs = {
  playerID: Scalars['Int']['input'];
};

export type StopGameMutationVariables = Exact<{
  gameCode: Scalars['String']['input'];
}>;


export type StopGameMutation = { __typename?: 'Mutation', stopGame?: boolean | null };

export type CreateGameMutationVariables = Exact<{
  gameData: GameInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame?: boolean | null };

export type EndRoundMutationVariables = Exact<{
  gameCode: Scalars['String']['input'];
  currentAnswer?: InputMaybe<CurrentAnswer>;
}>;


export type EndRoundMutation = { __typename?: 'Mutation', endRound?: boolean | null };

export type CreateSoloGameMutationVariables = Exact<{
  gameData: GameInput;
}>;


export type CreateSoloGameMutation = { __typename?: 'Mutation', createSoloGame?: boolean | null };

export type SendGameSummaryMutationVariables = Exact<{
  gameCode: Scalars['String']['input'];
  playerAnswers: Array<PlayerAnswers> | PlayerAnswers;
  playerScore: Scalars['Int']['input'];
}>;


export type SendGameSummaryMutation = { __typename?: 'Mutation', sendGameSummary?: boolean | null };

export type SeekGameMutationVariables = Exact<{
  seekGameInput: SeekGameInput;
}>;


export type SeekGameMutation = { __typename?: 'Mutation', seekGame?: boolean | null };

export type CancelSeekingGameMutationVariables = Exact<{
  seekGameInput: SeekGameInput;
}>;


export type CancelSeekingGameMutation = { __typename?: 'Mutation', cancelSeekingGame?: boolean | null };

export type GetDifficultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDifficultiesQuery = { __typename?: 'Query', difficulties: Array<{ __typename?: 'Difficulty', id: number, name: string }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string, logo: string }> };

export type GetUserGamesHistoryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserGamesHistoryQuery = { __typename?: 'Query', getUserGamesHistory: { __typename?: 'History', totalCount: number, history: Array<{ __typename?: 'HistoryInput', id: number, categoryName: string, opponentName?: string | null, questions: Array<{ __typename?: 'HistoryQuestion', questionName: string, isCorrectlyAnswered: boolean }> }> } };

export type OnNewQuestionSubscriptionVariables = Exact<{
  gameCode: Scalars['String']['input'];
}>;


export type OnNewQuestionSubscription = { __typename?: 'Subscription', newQuestion: { __typename?: 'Question', id: number, name: string, startTime: string, duration: number, latency: number, questionAmount?: number | null, answer: { __typename?: 'Answer', correct: string, incorrect: Array<string> } } };

export type OnOpponentFoundSubscriptionVariables = Exact<{
  playerID: Scalars['Int']['input'];
}>;


export type OnOpponentFoundSubscription = { __typename?: 'Subscription', opponentFound: { __typename?: 'OpponentFound', gameCode: string } };

export type OnOpponentAnswerSubscriptionVariables = Exact<{
  gameCode: Scalars['String']['input'];
  playerID: Scalars['Int']['input'];
}>;


export type OnOpponentAnswerSubscription = { __typename?: 'Subscription', opponentAnswer: { __typename?: 'OpponentAnswer', isCorrect: boolean } };


export const StopGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}}}]}]}}]} as unknown as DocumentNode<StopGameMutation, StopGameMutationVariables>;
export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameData"}}}]}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const EndRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentAnswer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CurrentAnswer"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endRound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"currentAnswer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentAnswer"}}}]}]}}]} as unknown as DocumentNode<EndRoundMutation, EndRoundMutationVariables>;
export const CreateSoloGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSoloGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSoloGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameData"}}}]}]}}]} as unknown as DocumentNode<CreateSoloGameMutation, CreateSoloGameMutationVariables>;
export const SendGameSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendGameSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerAnswers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlayerAnswers"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerScore"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendGameSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerAnswers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerAnswers"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerScore"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerScore"}}}]}]}}]} as unknown as DocumentNode<SendGameSummaryMutation, SendGameSummaryMutationVariables>;
export const SeekGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"seekGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seekGameInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeekGameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seekGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"seekGameInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seekGameInput"}}}]}]}}]} as unknown as DocumentNode<SeekGameMutation, SeekGameMutationVariables>;
export const CancelSeekingGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cancelSeekingGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seekGameInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeekGameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelSeekingGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"seekGameInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seekGameInput"}}}]}]}}]} as unknown as DocumentNode<CancelSeekingGameMutation, CancelSeekingGameMutationVariables>;
export const GetDifficultiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDifficulties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"difficulties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetDifficultiesQuery, GetDifficultiesQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetUserGamesHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserGamesHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserGamesHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionName"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrectlyAnswered"}}]}},{"kind":"Field","name":{"kind":"Name","value":"opponentName"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserGamesHistoryQuery, GetUserGamesHistoryQueryVariables>;
export const OnNewQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnNewQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"answer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"incorrect"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"latency"}},{"kind":"Field","name":{"kind":"Name","value":"questionAmount"}}]}}]}}]} as unknown as DocumentNode<OnNewQuestionSubscription, OnNewQuestionSubscriptionVariables>;
export const OnOpponentFoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnOpponentFound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"opponentFound"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameCode"}}]}}]}}]} as unknown as DocumentNode<OnOpponentFoundSubscription, OnOpponentFoundSubscriptionVariables>;
export const OnOpponentAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnOpponentAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"opponentAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}}]}}]}}]} as unknown as DocumentNode<OnOpponentAnswerSubscription, OnOpponentAnswerSubscriptionVariables>;