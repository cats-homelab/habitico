import { API } from "./base";
import type { User } from "@/types/user";

class UsersFetcher extends API {
  profile<R = User>() {
    return super.get<R>({
      path: "users/profile",
    });
  }
}

export const usersFetcher = new UsersFetcher();