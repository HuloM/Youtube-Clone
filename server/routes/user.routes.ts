import { Router } from "express";
import { body, CustomValidator } from "express-validator";
import { signup, login } from "../controllers/user.controller";

import User from "../models/user/user.schema";

const router = Router();
const emailValidator: CustomValidator = (value) => {
    return User.findOne({ email: value }).then((user) => {
        if (user) {
            return Promise.reject("E-mail already in use");
        }
    });
};

const usernameValidator: CustomValidator = (value) => {
    return User.findOne({ username: value }).then((user) => {
        if (user) {
            return Promise.reject("username already in use");
        }
    });
};

router.put(
    "/signup",
    body("email").isEmail().custom(emailValidator).trim(),
    body("username").custom(usernameValidator).trim(),
    body("password").isLength({ min: 10 }).trim(),
    body("passwordConfirmation")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
    signup
);
router.post(
    "/login",
    body("user").not().isEmpty().trim(),
    body("password").isLength({ min: 10 }).trim(),
    login
);

export default router;
