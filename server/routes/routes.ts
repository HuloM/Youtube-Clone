import { Router } from "express";
import userRouter from "./user.routes";
import videoRouter from "./video.routes";

const router = Router();

router.use(userRouter);
router.use(videoRouter);

export default router;
