import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(
    error: HttpException,
    _req: Request,
    _res: Response,
    next: NextFunction
) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    console.log(error);
    _res.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
