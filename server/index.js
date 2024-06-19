const express = require("express");
const db = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

function isSpecial(specialstring) {
    if(specialstring === "on") {
        return "*";
    } else {
        return "";
    }
}

app.get("/api/get/random", (req,res) => {
    let queryConstruct = "SELECT * FROM asides ";
    if(req.query.special === "on") {
        queryConstruct = queryConstruct + "WHERE Special='*'"
    }
    queryConstruct = queryConstruct + "ORDER BY RAND() LIMIT 1";
    db.query(queryConstruct, (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log("fetching random");
    
        return resultJson;
    });   
});

app.get("/api/get/artists", (req,res) => {
    db.query("SELECT Artist, Album, Year FROM asides", (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log("fetching artists");    
        return resultJson;
    });   
});

app.post("/api/post/upload", (req,res) => {
    const newAlbum = req.body;
    const uploadQuery = `INSERT INTO asides(Artist,Album,Year,Genre1,Genre2,Genre3,Special) 
                        VALUES (
                            '${newAlbum.Artist}', 
                            '${newAlbum.Album}', 
                            '${newAlbum.Year}', 
                            '${newAlbum.Genre1}', 
                            '${newAlbum.Genre2}', 
                            '${newAlbum.Genre3}', 
                            '${isSpecial(newAlbum.Special)}')`
    console.log(uploadQuery);
    db.query(uploadQuery, (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log(`uploaded record at ${result.insertedId}`);    
        return resultJson;
    });  
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})