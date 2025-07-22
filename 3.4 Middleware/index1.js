import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const time = 2000;

app.use(bodyParser.urlencoded({ extended: true }));


app.post("/submit", (req, res) => {
  console.log(req.body);
  console.log('Status success: 200');
  res.send(`<h1>Submittion complete!</h1> 
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
