import { Request, Response } from "express";
import Video from "../models/video/video";
import { validationResult } from "express-validator";
import path from "path";
import { unlink } from "fs";

export async function upload(_req: Request, _res: Response) {
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
                deleteFile(files["video"][0].path);
                deleteFile(files["thumbnail"][0].path);
            }
            return _res.status(400).json({ errors: errors.array() });
        }

        console.log(_req.body);
        if (files) {
            let video_url = "videos/" + files["video"][0].filename;
            let thumbnail_url = "thumbnail/" + files["thumbnail"][0].filename;
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
            });
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteFile = async (imagePath: string) => {
    let filePath = path.join(__dirname, "..", imagePath);
    await unlink(filePath, (err) => {
        if (err) console.log(err);
    });
};