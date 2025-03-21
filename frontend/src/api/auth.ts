import type { UserWithAuth } from "@/types/user";
import { API } from "./base";

class AuthFetcher extends API {
  login<R = UserWithAuth>(email: string, password: string) {
    return super.post<R>({
      path: "login",
      params: {
        email,
        password,
      },
    });
  }

  register<R = UserWithAuth>(email: string, password: string) {
    return super.post<R>({
      path: "register",
      params: {
        email,
        password,
      },
    });
  }
}

export const authFetcher = new AuthFetcher();
