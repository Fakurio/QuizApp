/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createGame($gameData: GameInput!) {\n    createGame(gameData: $gameData)\n  }\n": types.CreateGameDocument,
    "\n  subscription OnNewQuestion($gameCode: String!) {\n    newQuestion(gameCode: $gameCode) {\n      name\n      answer {\n        correct\n        incorrect\n      }\n      startTime\n      duration\n      latency\n      questionAmount\n    }\n  }\n": types.OnNewQuestionDocument,
    "\n  query GetDifficulties {\n    difficulties {\n      id\n      name\n    }\n  }\n": types.GetDifficultiesDocument,
    "\n  mutation StopGame($gameCode: String!) {\n    stopGame(gameCode: $gameCode)\n  }\n": types.StopGameDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n      logo\n    }\n  }\n": types.GetCategoriesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createGame($gameData: GameInput!) {\n    createGame(gameData: $gameData)\n  }\n"): (typeof documents)["\n  mutation createGame($gameData: GameInput!) {\n    createGame(gameData: $gameData)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnNewQuestion($gameCode: String!) {\n    newQuestion(gameCode: $gameCode) {\n      name\n      answer {\n        correct\n        incorrect\n      }\n      startTime\n      duration\n      latency\n      questionAmount\n    }\n  }\n"): (typeof documents)["\n  subscription OnNewQuestion($gameCode: String!) {\n    newQuestion(gameCode: $gameCode) {\n      name\n      answer {\n        correct\n        incorrect\n      }\n      startTime\n      duration\n      latency\n      questionAmount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDifficulties {\n    difficulties {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetDifficulties {\n    difficulties {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation StopGame($gameCode: String!) {\n    stopGame(gameCode: $gameCode)\n  }\n"): (typeof documents)["\n  mutation StopGame($gameCode: String!) {\n    stopGame(gameCode: $gameCode)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategories {\n    categories {\n      id\n      name\n      logo\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      id\n      name\n      logo\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;