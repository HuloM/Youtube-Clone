import { Router } from "express";
import { body, check } from "express-validator";
import {
    upload,
    deleteVideo,
    likeVideo,
    getVideo,
    getVideos,
} from "../controllers/video.controller";

import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.put(
    "/upload",
    body("title")
        .isLength({ min: 5 })
        .trim()
        .withMessage("Title is too short, min: 5 characters"),
    check("thumbnail")
        .custom((value, { req }) => {
            return (
                req.files["thumbnail"][0].mimetype === "image/png" ||
                req.files["thumbnail"][0].mimetype === "image/jpg" ||
                req.files["thumbnail"][0].mimetype === "image/jpeg"
            );
        })
        .withMessage(
            "incorrect file type submitted (thumbnail must be a PNG, a JPG, or a JPEG)"
        ),
    check("video")
        .custom((value, { req }) => {
            return req.files["video"][0].mimetype === "video/mp4";
        })
        .withMessage(
            "incorrect file type submitted (video must be an MP4 file)"
        ),
    authMiddleware,
    upload
);

router.delete(
    "/delete",
    body("video_id").not().isEmpty().trim(),
    authMiddleware,
    deleteVideo
);

router.put(
    "/like",
    body("video_id").not().isEmpty().trim(),
    authMiddleware,
    likeVideo
);

router.get("/getVideo", body("video_id").not().isEmpty().trim(), getVideo);

router.get("/getVideos", body("page").not().isEmpty().trim(), getVideos);

export default router;
