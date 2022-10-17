import express from "express";
import "dotenv/config";
import { connect } from "mongoose";

const app: express.Application = express();
const port: number = 80;

const connString: string = `${process.env.MONGODB_CONN_STRING}`;

app.get("/", (_req, _res) => {
    _res.send("TypeScript With Express");
});

connect(connString)
    .then((result) => {
        app.listen(port, () => {
            console.log(`node running on http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
