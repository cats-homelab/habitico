export type User = {
  id: number;
  name: string;
  email: string;
};
export type UserWithAuth = User & {
  access_token: string;
};
