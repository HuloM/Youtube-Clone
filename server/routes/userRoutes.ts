import { Router } from "express";

import { signup, login } from "../controllers/user.controller";

import User from "../models/user";

const router = Router();

router.put("/signup", signup);
router.post("/login", login);

export default router;
