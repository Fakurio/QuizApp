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
    "\n  mutation StopGame($gameCode: String!) {\n    stopGame(gameCode: $gameCode)\n  }\n": types.StopGameDocument,
    "\n  mutation createGame($gameData: GameInput!) {\n    createGame(gameData: $gameData)\n  }\n": types.CreateGameDocument,
    "\n  mutation endRound($gameCode: String!, $currentAnswer: CurrentAnswer) {\n    endRound(gameCode: $gameCode, currentAnswer: $currentAnswer)\n  }\n": types.EndRoundDocument,
    "\n  mutation createSoloGame($gameData: GameInput!) {\n    createSoloGame(gameData: $gameData)\n  }\n": types.CreateSoloGameDocument,
    "\n  mutation sendGameSummary(\n    $gameCode: String!\n    $playerAnswers: [PlayerAnswers!]!\n    $playerScore: Int!\n  ) {\n    sendGameSummary(\n      gameCode: $gameCode\n      playerAnswers: $playerAnswers\n      playerScore: $playerScore\n    ) {\n      id\n      categoryName\n      questions {\n        questionName\n        isCorrectlyAnswered\n      }\n      opponentName\n    }\n  }\n": types.SendGameSummaryDocument,
    "\n  mutation seekGame($seekGameInput: SeekGameInput!) {\n    seekGame(seekGameInput: $seekGameInput)\n  }\n": types.SeekGameDocument,
    "\n  mutation cancelSeekingGame($seekGameInput: SeekGameInput!) {\n    cancelSeekingGame(seekGameInput: $seekGameInput)\n  }\n": types.CancelSeekingGameDocument,
    "\n  query GetDifficulties {\n    difficulties {\n      id\n      name\n    }\n  }\n": types.GetDifficultiesDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n      logo\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query getUserGamesHistory($offset: Int, $limit: Int) {\n    getUserGamesHistory(offset: $offset, limit: $limit) {\n      totalCount\n      history {\n        id\n        categoryName\n        questions {\n          questionName\n          isCorrectlyAnswered\n        }\n        opponentName\n      }\n    }\n  }\n": types.GetUserGamesHistoryDocument,
    "\n  query GetHighlights($categoryName: String!) {\n    getHighlights(categoryName: $categoryName) {\n      categoryName\n      difficultyName\n      avgScore\n    }\n  }\n": types.GetHighlightsDocument,
    "\n  subscription OnNewQuestion($gameCode: String!) {\n    newQuestion(gameCode: $gameCode) {\n      id\n      name\n      answer {\n        correct\n        incorrect\n      }\n      startTime\n      duration\n      latency\n      questionAmount\n    }\n  }\n": types.OnNewQuestionDocument,
    "\n  subscription OnOpponentFound($playerID: Int!) {\n    opponentFound(playerID: $playerID) {\n      gameCode\n    }\n  }\n": types.OnOpponentFoundDocument,
    "\n  subscription OnOpponentAnswer($gameCode: String!, $playerID: Int!) {\n    opponentAnswer(gameCode: $gameCode, playerID: $playerID) {\n      isCorrect\n    }\n  }\n": types.OnOpponentAnswerDocument,
    "\n  subscription OnOpponentDisconnected($gameCode: String!) {\n    opponentDisconnected(gameCode: $gameCode) {\n      gameCode\n    }\n  }\n": types.OnOpponentDisconnectedDocument,
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
export function gql(source: "\n  mutation StopGame($gameCode: String!) {\n    stopGame(gameCode: $gameCode)\n  }\n"): (typeof documents)["\n  mutation StopGame($gameCode: String!) {\n    stopGame(gameCode: $gameCode)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createGame($gameData: GameInput!) {\n    createGame(gameData: $gameData)\n  }\n"): (typeof documents)["\n  mutation createGame($gameData: GameInput!) {\n    createGame(gameData: $gameData)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation endRound($gameCode: String!, $currentAnswer: CurrentAnswer) {\n    endRound(gameCode: $gameCode, currentAnswer: $currentAnswer)\n  }\n"): (typeof documents)["\n  mutation endRound($gameCode: String!, $currentAnswer: CurrentAnswer) {\n    endRound(gameCode: $gameCode, currentAnswer: $currentAnswer)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createSoloGame($gameData: GameInput!) {\n    createSoloGame(gameData: $gameData)\n  }\n"): (typeof documents)["\n  mutation createSoloGame($gameData: GameInput!) {\n    createSoloGame(gameData: $gameData)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation sendGameSummary(\n    $gameCode: String!\n    $playerAnswers: [PlayerAnswers!]!\n    $playerScore: Int!\n  ) {\n    sendGameSummary(\n      gameCode: $gameCode\n      playerAnswers: $playerAnswers\n      playerScore: $playerScore\n    ) {\n      id\n      categoryName\n      questions {\n        questionName\n        isCorrectlyAnswered\n      }\n      opponentName\n    }\n  }\n"): (typeof documents)["\n  mutation sendGameSummary(\n    $gameCode: String!\n    $playerAnswers: [PlayerAnswers!]!\n    $playerScore: Int!\n  ) {\n    sendGameSummary(\n      gameCode: $gameCode\n      playerAnswers: $playerAnswers\n      playerScore: $playerScore\n    ) {\n      id\n      categoryName\n      questions {\n        questionName\n        isCorrectlyAnswered\n      }\n      opponentName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation seekGame($seekGameInput: SeekGameInput!) {\n    seekGame(seekGameInput: $seekGameInput)\n  }\n"): (typeof documents)["\n  mutation seekGame($seekGameInput: SeekGameInput!) {\n    seekGame(seekGameInput: $seekGameInput)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation cancelSeekingGame($seekGameInput: SeekGameInput!) {\n    cancelSeekingGame(seekGameInput: $seekGameInput)\n  }\n"): (typeof documents)["\n  mutation cancelSeekingGame($seekGameInput: SeekGameInput!) {\n    cancelSeekingGame(seekGameInput: $seekGameInput)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDifficulties {\n    difficulties {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetDifficulties {\n    difficulties {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategories {\n    categories {\n      id\n      name\n      logo\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      id\n      name\n      logo\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserGamesHistory($offset: Int, $limit: Int) {\n    getUserGamesHistory(offset: $offset, limit: $limit) {\n      totalCount\n      history {\n        id\n        categoryName\n        questions {\n          questionName\n          isCorrectlyAnswered\n        }\n        opponentName\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserGamesHistory($offset: Int, $limit: Int) {\n    getUserGamesHistory(offset: $offset, limit: $limit) {\n      totalCount\n      history {\n        id\n        categoryName\n        questions {\n          questionName\n          isCorrectlyAnswered\n        }\n        opponentName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetHighlights($categoryName: String!) {\n    getHighlights(categoryName: $categoryName) {\n      categoryName\n      difficultyName\n      avgScore\n    }\n  }\n"): (typeof documents)["\n  query GetHighlights($categoryName: String!) {\n    getHighlights(categoryName: $categoryName) {\n      categoryName\n      difficultyName\n      avgScore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnNewQuestion($gameCode: String!) {\n    newQuestion(gameCode: $gameCode) {\n      id\n      name\n      answer {\n        correct\n        incorrect\n      }\n      startTime\n      duration\n      latency\n      questionAmount\n    }\n  }\n"): (typeof documents)["\n  subscription OnNewQuestion($gameCode: String!) {\n    newQuestion(gameCode: $gameCode) {\n      id\n      name\n      answer {\n        correct\n        incorrect\n      }\n      startTime\n      duration\n      latency\n      questionAmount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnOpponentFound($playerID: Int!) {\n    opponentFound(playerID: $playerID) {\n      gameCode\n    }\n  }\n"): (typeof documents)["\n  subscription OnOpponentFound($playerID: Int!) {\n    opponentFound(playerID: $playerID) {\n      gameCode\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnOpponentAnswer($gameCode: String!, $playerID: Int!) {\n    opponentAnswer(gameCode: $gameCode, playerID: $playerID) {\n      isCorrect\n    }\n  }\n"): (typeof documents)["\n  subscription OnOpponentAnswer($gameCode: String!, $playerID: Int!) {\n    opponentAnswer(gameCode: $gameCode, playerID: $playerID) {\n      isCorrect\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnOpponentDisconnected($gameCode: String!) {\n    opponentDisconnected(gameCode: $gameCode) {\n      gameCode\n    }\n  }\n"): (typeof documents)["\n  subscription OnOpponentDisconnected($gameCode: String!) {\n    opponentDisconnected(gameCode: $gameCode) {\n      gameCode\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;