const express = require("express");
const db = require('./config/db');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    /* we need to
        retrieve pw from sql database with query
        bcrypt.compare to submitted password
        if true, return token
    */
    db.query(`SELECT username, password FROM users WHERE username='${req.body.user}'`, (err, result) => {
        if(err) {
            console.log(err)
        }
        console.log(req.body, 1);
        console.log(result, 2);
        bcrypt.compare(req.body.pass, result[0].password, function (err, response) {
            if (err) {
                //handle err
            }
            if (response) {
                console.log('login success')
                return res.send({ token: "testtoken" })
            } else {
                console.log('login failure')
                return "Invalid Credentials"
            }
        })
    })

    /*
    try {
        const userData = await db.query(`SELECT username, password FROM users WHERE username='${req.body.user}'`);
        console.log(userData)
    } catch (err) {
        console.error(err);
    }*/
    
})

app.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.pass, salt);
    let queryConstruct = `INSERT INTO users(username,password) 
    VALUES (
        '${req.body.user}',
        '${secPass}'
    )`
    db.query(queryConstruct, (err, result) => {
        if(err) {
            console.log(err)
        } 
        const resultJson = res.json(result);
        console.log(`created new user at ${result.insertedId}`);    
        return resultJson;
    })
})

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
    db.query("SELECT id, Artist, Album, Year FROM asides", (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log("fetching artists");    
        return resultJson;
    });   
});

app.get("/api/get/genrelist", (req,res) => {
    const genrequery = "SELECT DISTINCT Genre1 FROM asides WHERE Genre1 IS NOT NULL AND Genre1 <> '' UNION SELECT DISTINCT Genre2 FROM asides WHERE Genre2 IS NOT NULL AND Genre2 <> '' UNION SELECT DISTINCT Genre3 FROM asides WHERE Genre3 IS NOT NULL AND Genre3 <> '';"
    db.query(genrequery, (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log("fetching genre list");    
        return resultJson;
    });   
});

app.get("/api/get/album/:id", (req,res) => {
    db.query(`SELECT * FROM asides WHERE id='${req.params.id}'`, (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log("fetching album info");    
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

/*if(result[0].password === passCheck) {
            console.log("login attempt successful");
            res.send({
                token: 'testtoken'
            })
        } else {
            console.log("login attempt failed");
            res.send({
                token: false
            })
        }*/