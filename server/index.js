const express = require("express");
const db = require('./config/db');
const cors = require('cors');
const userRoute = require('./routes/user');
const genreRoute = require('./routes/genre');
const albumRoute = require('./routes/album');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/genre', genreRoute);
app.use('/album', albumRoute);

app.get("/artists", (req,res) => {
    db.query("SELECT id, Artist, Album, Year FROM asides", (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log("fetching artists");    
        return resultJson;
    });   
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})