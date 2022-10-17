import express from "express";

const app: express.Application = express();

const port: number = 80;

app.get("/", (_req, _res) => {
    _res.send("TypeScript With Express");
});

app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
