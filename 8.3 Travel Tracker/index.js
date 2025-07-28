import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import pkg from "pg";

dotenv.config();

const { Client } = pkg;

let data = {};

const db = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  data = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  data.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
