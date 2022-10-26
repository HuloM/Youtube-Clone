import userDocument from "./user.interface";

type UserUsernameOnly = Omit<userDocument, "password" | "email">;

export type UsernameFilter = UserUsernameOnly;
