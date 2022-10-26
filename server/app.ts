import path from "path";

import express, { Request } from "express";
import { connect } from "mongoose";

import "dotenv/config";

import Routes from "./routes/routes";

import multerMiddleware from "./middleware/multer.middleware";
import errorMiddleware from "./middleware/error.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: express.Application = express();
const port: number = 80;

const connString: string = `${process.env.MONGODB_CONN_STRING}`;

app.use(express.json());

app.use(cors<Request>());

app.use(
    "/thumbnails",
    express.static(path.join(__dirname, "/public/thumbnails"))
);
app.use("/videos", express.static(path.join(__dirname, "/public/videos")));

// configuring express app to use multer, and only accept a single file upload per request
app.use(multerMiddleware);
app.use(cookieParser());

app.use("/v1", Routes);

app.use(errorMiddleware);

connect(connString)
    .then((result) => {
        app.listen(port, () => {
            console.log(`node running on http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
