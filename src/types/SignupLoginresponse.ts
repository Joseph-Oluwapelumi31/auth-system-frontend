import { User } from "./user";

export interface LoginSignUpResponse {
    token: string;
    user: User
};