import { hash, compare } from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import User from "../models/user/user.schema";
import { validationResult } from "express-validator";
import { Document, Types } from "mongoose";
import userDocument from "../interfaces/user.interface";
import { sign } from "jsonwebtoken";
import { TokenData, DataStoredInToken } from "../interfaces/token.interface";

export async function signup(
    _req: Request,
    _res: Response,
    next: NextFunction
) {
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

        if (user && user.password) {
            user.password = "";

            const token = createToken(user);
            _res.setHeader("Set-Cookie", [createCookie(token)]);

            return _res.status(201).json({
                message: "user created",
                user: user,
            });
        }

        throw new Error();
    } catch (e) {
        if (e instanceof Error) next(e.message);
        else next("something is wrong");
    }
}

export async function login(_req: Request, _res: Response, next: NextFunction) {
    try {
        const errors = validationResult(_req);
        if (!errors.isEmpty()) {
            return _res.status(400).json({ errors: errors.array() });
        }

        const username: string = _req.body.user;
        const password: string = _req.body.password;

        let user:
            | (Document<unknown, any, userDocument> &
                  userDocument & { _id: Types.ObjectId })
            | null;

        if (username.includes("@"))
            user = await User.findOne({ email: username });
        else user = await User.findOne({ username: username });

        if (user)
            compare(password, user?.password).then((res) => {
                if (res) {
                    if (user && user.password) {
                        user.password = "";

                        const token = createToken(user);
                        _res.setHeader("Set-Cookie", [createCookie(token)]);

                        return _res.status(201).json({
                            message: "user logged in",
                            user: user,
                        });
                    }
                } else
                    return _res.status(401).json({
                        message: "username or password are incorrect",
                    });
            });
        else
            return _res.status(404).json({
                message: "no user with that username exists",
            });
    } catch (e) {
        if (e instanceof Error) next(e.message);
        else next("something is wrong");
    }
}

const createToken = (
    user:
        | (Document<unknown, any, userDocument> &
              userDocument & { _id: Types.ObjectId })
        | null
): TokenData => {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    let dataStoredInToken: DataStoredInToken;
    if (user) {
        dataStoredInToken = {
            _id: user._id.toString(),
        };
        return {
            expiresIn,
            token: sign(dataStoredInToken, secret as string, { expiresIn }),
        };
    }
    return {
        expiresIn,
        token: "",
    };
};

const createCookie = (tokenData: TokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
};
