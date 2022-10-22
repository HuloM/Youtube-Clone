import { Schema, model } from "mongoose";
import userDocument from "../../interfaces/user.interface";

const userSchema = new Schema<userDocument>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default model("Users", userSchema);
