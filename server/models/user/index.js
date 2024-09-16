const db = require('../../config/db.js');
const bcrypt = require('bcrypt');

function loginQuery(username, password, res) {
    db.query(`SELECT username, password FROM users WHERE username='${username}'`, (err, result) => {
        if(err) {
            console.log(err)
        }
        bcrypt.compare(password, result[0].password, function (err, response) {
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
}

function signupQuery(query, log, res) {
    db.query(query, (err, result) => {
        if(err) {
            console.log(err)
        } 
        const resultJson = res.json(result);
        console.log(log);    
        return resultJson;
    })
}

module.exports = { loginQuery, signupQuery }