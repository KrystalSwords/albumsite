const express = require('express');
const router = express.Router();
const db = require('../../config/db.js');
const genreListQuery = require('../../models/genre/index.js');

router.get("/genrelist", (req,res) => {
    const genreQuery = "SELECT DISTINCT Genre1 FROM asides WHERE Genre1 IS NOT NULL AND Genre1 <> '' UNION SELECT DISTINCT Genre2 FROM asides WHERE Genre2 IS NOT NULL AND Genre2 <> '' UNION SELECT DISTINCT Genre3 FROM asides WHERE Genre3 IS NOT NULL AND Genre3 <> '';"
    genreListQuery(genreQuery, res)   
});

module.exports = router;