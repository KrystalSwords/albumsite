const db = require('../../config/db.js');

function genreListQuery(genreQuery, res) {
    db.query(genreQuery, (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log("fetching genre list");    
        return resultJson;
    });
}

module.exports = genreListQuery;