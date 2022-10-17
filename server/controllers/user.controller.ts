import { hash } from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/user";

export async function signup(_req: Request, _res: Response) {
    try {
        console.log("test");
        const username: string = _req.body.username;
        const email: string = _req.body.email;
        const password: string = _req.body.password;

        const hashPass: string = await hash(password, 12);

        const user = await new User({
            username: username,
            email: email,
            password: hashPass,
        }).save();
        _res.status(201).json({
            message: "user created",
        });
    } catch (err) {
        console.log(err);
    }
}
