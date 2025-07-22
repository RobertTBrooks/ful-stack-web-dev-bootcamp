import express from 'express';
import ejs from 'ejs';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/", (req, res) => {
    try {
        const today = new Date();
        const checkDate = today.getDay() === 0 || today.getDay() === 6 ? "the WeekEnd" : "a WeekDay";
        const getMessage = checkDate === 'the WeekEnd' ? "it's time to have fun!" : "it's time to work hard!";
        
        const data = {
            title: "Guess What?",
            dayOfWeek: `${checkDate}`,
            message: `${getMessage}`
        };
    
        res.render('index', data);
        
    } catch (error) {
        console.error(error);
    }

});


app.listen(port, ()=> {
    console.log(`Listening on port: ${port}`);
});