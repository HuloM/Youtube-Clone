import { Request, Response, NextFunction } from "express";
import Video from "../models/video/video";
import { validationResult } from "express-validator";
import path from "path";
import { unlink } from "fs";

// ????????????????? what even this lets Express.Multer.File exist and also the files property on Requests????????????
// ok
import { Multer } from "multer";

import userRequest from "../interfaces/userRequest.interface";

type userReq = userRequest & Request;

export async function upload(
    _req: Request,
    _res: Response,
    next: NextFunction
) {
    try {
        const req = _req as unknown as userRequest;
        let files;
        if (req.files) {
            files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };
        }
        const errors = validationResult(req);
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
            let title = req.body.title;
            let likes = 0;

            const video = await new Video({
                video_url: video_url,
                thumbnail_url: thumbnail_url,
                title: title,
                likes: likes,
                user: req.user._id,
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

export async function deleteVideo(
    _req: Request,
    _res: Response,
    next: NextFunction
) {
    try {
        const req = _req as unknown as userRequest;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return _res.status(400).json({ errors: errors.array() });
        }

        const video = await Video.findById(req.body.video_id);
        if (video) {
            if (video.user.toString() === req.user._id.toString()) {
                deleteFile("public/" + video.video_url, next);
                deleteFile("public/" + video.thumbnail_url, next);
                await Video.deleteOne({ _id: req.body.video_id });

                return _res.status(201).json({
                    message: "video deleted successfully",
                });
            } else
                return _res.status(401).json({
                    message: "You are not the video Creator",
                });
        }
        return _res.status(404).json({
            message: "Video not found, check the ID again.",
        });
    } catch (e) {
        if (e instanceof Error) next(e.message);
        else next("something is wrong");
    }
}

export async function likeVideo(
    _req: Request,
    _res: Response,
    next: NextFunction
) {
    try {
        const req = _req as unknown as userRequest;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return _res.status(400).json({ errors: errors.array() });
        }

        const video = await Video.findById(req.body.video_id);
        if (video) {
            if (video.user.toString() === req.user._id.toString()) {
                return _res.status(400).json({
                    message: "You cannot like your own video",
                });
            } else if (req.user._id.toString()) {
                // TODO add in a way to link user with their like
                console.log(video.likes);
                video.likes += 1;
                console.log(video.likes);

                video.save();

                return _res.status(201).json({
                    message: "video was liked",
                });
            } else
                return _res.status(401).json({
                    message: "You are not logged in and cannot like a video",
                });
        }
        return _res.status(404).json({
            message: "Video not found, check the ID again.",
        });
    } catch (e) {
        if (e instanceof Error) next(e.message);
        else next("something is wrong");
    }
}

const deleteFile = async (imagePath: string, next: NextFunction) => {
    let filePath = path.join(__dirname, "..", imagePath);
    console.log(filePath);
    await unlink(filePath, (e) => {
        if (e) {
            if (e instanceof Error) next(e.message);
            else next("something is wrong");
        }
    });
};
