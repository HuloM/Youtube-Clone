import { Router } from "express";

import { signup } from "../controllers/user.controller";

import User from "../models/user";

const router = Router();

router.put("/signup", signup);

export default router;
