import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import Routes from "./routes/routes";
import bodyParser from "body-parser";

const app: express.Application = express();
const port: number = 80;

const connString: string = `${process.env.MONGODB_CONN_STRING}`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
