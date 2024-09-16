const express = require('express');
const { albumQuery } = require('../../models/album');
const router = express.Router();

router.get("/random", (req,res) => {
    let queryConstruct = "SELECT * FROM asides ";
    if(req.query.special || req.query.genre) {
        queryConstruct = queryConstruct + "WHERE "
    }
    if(req.query.special) {
        queryConstruct = queryConstruct + "Special='*'"
    }
    if(req.query.special && req.query.genre !== "") {
        queryConstruct = queryConstruct + " AND "
    }
    if(req.query.genre) {
        queryConstruct = queryConstruct + `(Genre1='${req.query.genre}' OR Genre2='${req.query.genre}' OR Genre3='${req.query.genre}')`
    }
    queryConstruct = queryConstruct + " ORDER BY RAND() LIMIT 1";
    albumQuery(queryConstruct, 'fetching random album', res); 
});

router.get("/:id", (req,res) => {
    albumQuery(`SELECT * FROM asides WHERE id='${req.params.id}'`, `fetching album ${req.params.id}`, res);
});

router.post("/upload", (req,res) => {
    const uploadQuery = `INSERT INTO asides(Artist,Album,Year,Genre1,Genre2,Genre3,Special) 
                        VALUES (
                            '${req.body.Artist}', 
                            '${req.body.Album}', 
                            '${req.body.Year}', 
                            '${req.body.Genre1}', 
                            '${req.body.Genre2}', 
                            '${req.body.Genre3}', 
                            '${isSpecial(req.body.Special)}')` 
    albumQuery(uploadQuery, `uploaded new record`, res)
});

function isSpecial(specialstring) {
    if(specialstring === "on") {
        return "*";
    } else {
        return "";
    }
}

router.post("/edit/:id", (req,res) => {
    const uploadQuery = `UPDATE asides SET 
                            Artist="${req.body.Artist}", 
                            Album="${req.body.Album}", 
                            Year='${req.body.Year}', 
                            Genre1='${req.body.Genre1}', 
                            Genre2='${req.body.Genre2}', 
                            Genre3='${req.body.Genre3}', 
                            Special='${isSpecial(req.body.Special)}'
                         WHERE id=${req.params.id}`
    albumQuery(uploadQuery, `edited record: ${req.params.id}`, res)
});

router.delete('/delete/:id', (req, res) => {
    albumQuery(`DELETE FROM asides WHERE id=${req.params.id}`, `deleting album at ${req.params.id}`, res)
});

module.exports = router;