import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "f0db49a3-493c-4ac0-b4ad-0e6140cba303";
const config = {
	headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
	const searchId = req.body.id;
	try {
		const result = await axios.get(API_URL + "/secrets/" + searchId, config);
		res.render("index.ejs", { content: JSON.stringify(result.data) });
	} catch (error) {
		console.log(error.response.data);
		res.render("index.ejs", {
			content:
				"Error: Please make a new selection. If your making a GET request please select an ID number",
		});
	}
});

app.post("/post-secret", async (req, res) => {
	// TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  const secret = req.body.secret;
  const score = req.body.score;

  const body = {
      "secret": secret,
      "score": score
  }
  try {
		const result = await axios.post(API_URL + "/secrets/",body, config);
		res.render("index.ejs", { content: JSON.stringify(result.data) });
	} catch (error) {
		console.log(error.response.data);
		res.render("index.ejs", {
			content:
				"Error: Please provide a secrate and score. Leave ID blank",
		});
	}
});

app.post("/put-secret", async (req, res) => {
	const searchId = req.body.id;
	// TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  const secret = req.body.secret;
  const score = req.body.score;

  const body = {
      "secret": secret,
      "score": score
  }
  try {
		const result = await axios.put(API_URL + "/secrets/" + searchId, body, config);
		res.render("index.ejs", { content: JSON.stringify(result.data) });
	} catch (error) {
		console.log(error.response.data);
		res.render("index.ejs", {
			content:
				"Error: Please provide a ID, secrate and score.",
		});
	}
});

app.post("/patch-secret", async (req, res) => {
	const searchId = req.body.id;
	// TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  const secret = req.body.secret;
  const score = req.body.score;
  let body = {};

  if (secret !== "" && score !== "") {
    body = {
        "secret": secret,
        "score": score
    }
  }
  else if (secret !== "") {
    body = {
      "secret": secret
    }
  }
  else if (score !== "") {
    body = {
      "score": score
    }
  }

  console.log(secret, score);


  try {
		const result = await axios.patch(API_URL + "/secrets/" + searchId, body, config);
		res.render("index.ejs", { content: JSON.stringify(result.data) });
	} catch (error) {
		console.log(error.response.data);
		res.render("index.ejs", {
			content:
				"Error: Please provide an ID and secrate or score or both to update a single item.",
		});
	}
});

app.post("/delete-secret", async (req, res) => {
	const searchId = req.body.id;
	// TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
		const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
		res.render("index.ejs", { content: JSON.stringify(result.data) });
	} catch (error) {
		console.log(error.response.data);
		res.render("index.ejs", {
			content:
				"Error Deleting: Please make a new selection. Please select an ID number that you created",
		});
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
