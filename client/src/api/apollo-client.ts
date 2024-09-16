import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";

const protectedOperations = [
  "createSoloGame",
  "sendGameSummary",
  "getUserGamesHistory",
  "seekGame",
  "cancelSeekingGame",
  "GetHighlights",
];

const createApolloClient = async (token: string | undefined) => {
  const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_HTML_URL}/graphql`,
  });

  const authLink = setContext((operation, { headers }) => {
    if (protectedOperations.includes(operation.operationName || "")) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    }

    return {
      headers: {
        ...headers,
      },
    };
  });

  const onDisconnect = () => {
    const headers = {
      type: "application/json",
    };
    const gameCode = localStorage.getItem("gameCode");
    localStorage.removeItem("gameCode");
    const payload = new Blob(
      [
        JSON.stringify({
          query: `mutation StopGame($gameCode: String!) {
            stopGame(gameCode: $gameCode)
          }`,
          variables: { gameCode },
        }),
      ],
      headers
    );
    navigator.sendBeacon(`${import.meta.env.VITE_HTML_URL}/graphql`, payload);
  };

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${import.meta.env.VITE_WS_URL}/graphql`,
      on: {
        connected: () => {
          window.addEventListener("beforeunload", onDisconnect);
        },
        closed: () => {
          window.removeEventListener("beforeunload", onDisconnect);
        },
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getUserGamesHistory: {
              keyArgs: false,
            },
          },
        },
      },
    }),
  });

  return client;
};

export default createApolloClient;
