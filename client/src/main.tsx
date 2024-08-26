import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./api/apollo-client.ts";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider } from "./contexts/CategoriesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <CategoriesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CategoriesProvider>
  </ApolloProvider>
);
