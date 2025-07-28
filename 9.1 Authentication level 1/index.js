import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const saltingRounds = parseInt(process.env.SALT);

const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  res.redirect("/");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltingRounds, async (err, hash) => {
    if (err) {
      console.log(`error hashing password ${err}`);
      return;
    }
    try {
      const dbRequest = await db.query(
        "SELECT email FROM users WHERE email = $1",
        [email]
      );

      if (!dbRequest.rows || dbRequest.rows.length === 0) {
        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
          email,
          hash,
        ]);
        // Optional: Redirect or respond
        res.render("secrets.ejs", {
          linkContent: "Back To Home Page",
          link: "/",
        });
      } else {
        console.error("Email already in use.");
        res.render("register.ejs", {
          errorPopup: `Email already registered: Please go to the login page.`,
          linkContent: "To Login Page",
          link: "/login",
        });
      }
    } catch (err) {
      console.error("DB Error:", err);
      res.render("register.ejs", {
        errorPopup: `Registration failed: ${err}`,
        linkContent: "To Home Page",
        link: "/",
      });
    }
  });
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;

  try {
    const dbRequest = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!dbRequest.rows || dbRequest.rows.length === 0) {
      res.render("login.ejs", {
        errorPopup: `There is no registered emails matching you input. Please sign up`,
        linkContent: "To Registration Page",
        link: "/register",
      });
      return;
    }
    const storedPassword = dbRequest.rows[0].password;

    bcrypt.compare(loginPassword, storedPassword, (err, result) => {
      if (err) {
        console.log(`Password compare failed: ${err}`);
      } else if (result) {
        console.log("Login Success");
        res.render("secrets.ejs", {
          linkContent: "Back To Home Page",
          link: "/",
        });
      } else {
        console.error("Login Failed.");
        res.render("login.ejs", {
          errorPopup: `The Password you supplied is incorrect, please try again.`,
          linkContent: "To Registration Page",
          link: "/register",
        });
      }
    });
  } catch (error) {
    console.error("DB Error:", err);
    res.render("login.ejs", {
      errorPopup: `Login failed: ${err}`,
      linkContent: "To Home Page",
      link: "/",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
