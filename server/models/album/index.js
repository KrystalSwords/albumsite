const db = require('../../config/db.js');

function albumQuery(query, log, res) {
    db.query(query, (err,result)=>{
        if(err) {
        console.log(err)
        } 
        const resultJson = res.json(result);
        console.log(log);
        return resultJson;
    }); 
}

module.exports = { albumQuery }