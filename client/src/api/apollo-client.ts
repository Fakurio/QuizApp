import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";

const createApolloClient = async (token: string | undefined) => {
  const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_HTML_URL}/graphql`,
  });

  const authLink = setContext((operation, { headers }) => {
    if (
      operation.operationName === "createSoloGame" ||
      operation.operationName === "sendGameSummary" ||
      operation.operationName === "getUserGamesHistory"
    ) {
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

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${import.meta.env.VITE_WS_URL}/graphql`,
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

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
