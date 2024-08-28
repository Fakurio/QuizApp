import { createContext, useContext, useState } from "react";

interface User {
  username: string;
  avatarUrl: string | null;
  accessToken: string;
}

interface AuthContextI {
  user: User | null;
  error: string | null;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void | User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextI>({} as AuthContextI);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>("");

  const login = async (email: string, password: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_HTML_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      setError(error.message);
      return;
    }

    const user = await response.json();
    setUser(user);
    return user;
  };

  const logout = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_HTML_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return;
    }

    setUser(null);
  };

  const value = {
    user,
    error,
    setError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
