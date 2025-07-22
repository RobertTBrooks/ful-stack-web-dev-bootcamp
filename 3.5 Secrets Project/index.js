//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let correctPsw = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(checkPassword);

app.post("/check", (req, res) => {
    if (correctPsw) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/incorrect.html");
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

function checkPassword(req, res, next) {
    const correctPassword = 'Anime5000';
    const psw = req.body.password;

    if (psw === correctPassword) {
        correctPsw = true;
    } else {
        correctPsw = false;
    }
    next();

}
