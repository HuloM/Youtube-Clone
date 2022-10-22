import { Document } from "mongoose";

export default interface userDocument extends Document {
    username: string;
    email: string;
    password: string;
}
