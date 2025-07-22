import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const time = 30000;

let bandName = '';

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bandNameGen)


app.post("/submit", (req, res) => {
  console.log(req.body);
  console.log('Status success: 200');
  res.send(`
    <h1>Your Band name is!</h1> 
    <h2>${bandName}</h2>
    <p>Click below to go back.</p>
    <p>You will be redirected after 30 seconds automatically</p>
    <a href="/">Return</a>
    <script defer>
      function autoRedirect() {
        setTimeout(() => {
        window.location.href = '/';
      }, ${time});

      }
    autoRedirect();
    </script>`
  );
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function bandNameGen(req, res, next) {
  const data = req.body;
  bandName = `${data.street}${data.pet}`;
  next();
}