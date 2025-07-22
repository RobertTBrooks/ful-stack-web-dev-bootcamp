import express from 'express';
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send('<h1>Home Page</h1>')
});

app.get("/contact", (req, res) => {
    res.send('<h1>Contact me: fatoldpotato@tato.com</h1>')
});

app.get("/about", (req, res) => {
    res.send('<h1>About me: Im a fat old potato</h1>')
});

app.listen(port, () => {
    console.log(`Server has started with port: ${port}`);
});