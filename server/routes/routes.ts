import { Router } from "express";
import userRouter from "./user.routes";
import videoRouter from "./video.routes";

const router = Router();

router.use("/auth", userRouter);
router.use("/video", videoRouter);

export default router;
