const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Krystall1ne!",
    database: "musiccat"
})

module.exports = db;