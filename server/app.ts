import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import Routes from "./routes/routes";
import path from "path";
import multer from "./middleware/multer.uploader";

const app: express.Application = express();
const port: number = 80;

const connString: string = `${process.env.MONGODB_CONN_STRING}`;

app.use(express.json());
app.use(
    "/thumbnails",
    express.static(path.join(__dirname, "/public/thumbnails"))
);
app.use("/videos", express.static(path.join(__dirname, "/public/videos")));

// configuring express app to use multer, and only accept a single file upload per request
app.use(multer);

app.use(Routes);

connect(connString)
    .then((result) => {
        app.listen(port, () => {
            console.log(`node running on http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
