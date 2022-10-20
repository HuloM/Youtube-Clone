import { Router } from "express";
import { body, CustomValidator } from "express-validator";
import { upload } from "../controllers/video.controller";

import Video from "../models/video/video";

const router = Router();

router.put("/upload", upload);

export default router;
