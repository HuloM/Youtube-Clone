import { Request, Response } from "express";
import Video from "../models/video/video";
import { validationResult } from "express-validator";

export async function upload(_req: Request, _res: Response) {
    try {
        const errors = validationResult(_req);
        if (!errors.isEmpty()) {
            return _res.status(400).json({ errors: errors.array() });
        }

        console.log(_req.body);
        return _res.status(201).json({
            message: "user created",
        });
    } catch (err) {
        console.log(err);
    }
}
