import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface User {
  username: string;
  avatarUrl: string | null;
  accessToken: string;
}

interface AuthContextI {
  user: User | null;
  setUser: (user: User) => void;
  error: string | null | string[];
  setError: (error: string | null) => void;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<boolean | void>;
  login: (email: string, password: string) => Promise<void | User>;
  logout: () => void;
  refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextI>({} as AuthContextI);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null | string[]>("");
  const location = useLocation();

  const refreshTokens = async () => {
    const response = await fetch(`${import.meta.env.VITE_HTML_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return;
    }

    const newUser = await response.json();
    setUser(newUser);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (
      !(
        params.get("username") &&
        params.get("accessToken") &&
        params.get("avatarUrl")
      )
    ) {
      refreshTokens();
    }
  }, []);

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_HTML_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      setError(error.message);
      return;
    }

    const message = await response.json();
    alert(message.message);
    return true;
  };

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
      await refreshTokens();
      logout();
    }

    setUser(null);
  };

  const value = {
    user,
    setUser,
    error,
    setError,
    register,
    login,
    logout,
    refreshTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
