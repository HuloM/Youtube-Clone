import { Request, Response, NextFunction } from "express";
import Video from "../models/video/video";
import { validationResult } from "express-validator";
import path from "path";
import { unlink } from "fs";

// ????????????????? what even this lets Express.Multer.File exist and also the files property on Requests????????????
// ok
import { Multer } from "multer";

export async function upload(
    _req: Request,
    _res: Response,
    next: NextFunction
) {
    try {
        let files;
        if (_req.files) {
            files = _req.files as {
                [fieldname: string]: Express.Multer.File[];
            };
        }
        const errors = validationResult(_req);
        if (!errors.isEmpty()) {
            if (files) {
                deleteFile(files["video"][0].path, next);
                deleteFile(files["thumbnail"][0].path, next);
            }
            return _res.status(400).json({ errors: errors.array() });
        }

        if (files) {
            let video_url = "videos/" + files["video"][0].filename;
            let thumbnail_url = "thumbnails/" + files["thumbnail"][0].filename;
            let title = _req.body.title;
            let likes = 0;

            const video = await new Video({
                video_url: video_url,
                thumbnail_url: thumbnail_url,
                title: title,
                likes: likes,
            }).save();

            return _res.status(201).json({
                message: "video uploaded successfully",
                video_url: "localhost:80/" + video.video_url,
                thumbnail_url: "localhost:80/" + video.thumbnail_url,
            });
        }
    } catch (e) {
        if (e instanceof Error) next(e.message);
        else next("something is wrong");
    }
}

const deleteFile = async (imagePath: string, next: NextFunction) => {
    let filePath = path.join(__dirname, "..", imagePath);
    await unlink(filePath, (e) => {
        if (e) {
            if (e instanceof Error) next(e.message);
            else next("something is wrong");
        }
    });
};
