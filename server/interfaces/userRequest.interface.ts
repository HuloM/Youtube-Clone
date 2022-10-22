import { Request } from "express";
import User from "./user.interface";

interface userRequest extends Request {
    user: User;
}

export default userRequest;
