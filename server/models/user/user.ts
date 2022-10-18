import { Schema, model } from "mongoose";
import IUser from "./IUser";

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default model("Users", userSchema);
