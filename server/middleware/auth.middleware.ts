import { NextFunction, Response, Request } from "express";

import userRequest from "../interfaces/userRequest.interface";
import { DataStoredInToken } from "../interfaces/token.interface";

import { verify } from "jsonwebtoken";

import User from "../models/user/user.schema";

async function authMiddleware(
    _req: Request,
    _res: Response,
    next: NextFunction
) {
    const req = _req as unknown as userRequest;
    const cookies = req.cookies;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = verify(
                cookies.Authorization,
                secret as string
            ) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await User.findById(id);
            if (user && user.password) {
                user.password = "";
                req.user = user;
                next();
            } else {
                next("Wrong auth token");
            }
        } catch (error) {
            next("Wrong auth token");
        }
    } else {
        next("Auth token missing");
    }
}

export default authMiddleware;
