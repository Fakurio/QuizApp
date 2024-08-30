import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider } from "./contexts/CategoriesContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CustomApolloProvider } from "./contexts/ApolloContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <CustomApolloProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </CustomApolloProvider>
    </AuthProvider>
  </BrowserRouter>
);
