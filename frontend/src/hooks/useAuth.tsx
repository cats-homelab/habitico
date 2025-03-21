import {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
  PropsWithChildren,
} from "react";
import Cookies from "js-cookie";

import { authFetcher, usersFetcher } from "@/api";
import { User } from "@/types/user";

const redirectUrl = "/dashboard" as const;

export type AuthContext = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
};

const authContext = createContext<AuthContext>(null!);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    authFetcher.login(email, password).then((response) => {
      const token = response.data.access_token;
      if (token) {
        Cookies.set("token", token);
        setToken(token);
        setUser(response.data);
        window.location.href = redirectUrl;
      }
    });
  };

  const register = (email: string, password: string) => {
    authFetcher.register(email, password).then((response) => {
      const token = response.data.access_token;
      if (token) {
        Cookies.set("token", token);
        setToken(token);
        setUser(response.data);
        window.location.href = redirectUrl;
      }
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("token");
  };

  useEffect(() => {
    const cookiesToken = Cookies.get("token");
    if (cookiesToken) {
      setToken(cookiesToken);
      usersFetcher.profile().then((response) => {
        setUser(response.data);
      });
    }
  }, [token]);

  return {
    isAuthenticated: !!token,
    user,
    token,
    login,
    register,
    logout,
  };
};
