import express, { response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index');
});

app.post("/submit", (req, res) => {
  const name = req.body.fName + req.body.lName;
  const data = {
    name: name
  }

  res.render('index', data);

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
