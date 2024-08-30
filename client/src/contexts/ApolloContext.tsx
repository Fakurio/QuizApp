import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import createApolloClient from "../api/apollo-client";
import { ApolloClient, ApolloProvider } from "@apollo/client";

const CustomApolloProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const generateClient = async () => {
      const generatedClient = await createApolloClient(user?.accessToken);
      setClient(generatedClient);
      setIsLoading(false);
    };

    generateClient();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (client) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
};

export { CustomApolloProvider };
