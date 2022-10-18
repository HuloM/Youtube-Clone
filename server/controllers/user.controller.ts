import { hash, compare } from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/user/user";
import { validationResult } from "express-validator";

export async function signup(_req: Request, _res: Response) {
    try {
        const errors = validationResult(_req);
        if (!errors.isEmpty()) {
            return _res.status(400).json({ errors: errors.array() });
        }

        const username: string = _req.body.username;
        const email: string = _req.body.email;
        const password: string = _req.body.password;

        const hashPass: string = await hash(password, 12);

        const user = await new User({
            username: username,
            email: email,
            password: hashPass,
        }).save();
        return _res.status(201).json({
            message: "user created",
        });
    } catch (err) {
        console.log(err);
    }
}

export async function login(_req: Request, _res: Response) {
    try {
        const errors = validationResult(_req);
        if (!errors.isEmpty()) {
            return _res.status(400).json({ errors: errors.array() });
        }

        const username: string = _req.body.user;
        const password: string = _req.body.password;

        let user;

        if (username.includes("@"))
            user = await User.findOne({ email: username });
        else user = await User.findOne({ username: username });

        if (user !== null)
            compare(password, user?.password).then((res) => {
                if (res) {
                    return _res.status(201).json({
                        message: "user logged in",
                    });
                } else
                    return _res.status(401).json({
                        message: "username or password are incorrect",
                    });
            });
        else
            return _res.status(404).json({
                message: "no user with that username exists",
            });
    } catch (err) {
        console.log(err);
    }
}
