const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { loginQuery, signupQuery } = require('../../models/user/index.js');

router.post('/login', async (req, res) => {
    loginQuery(req.body.user, req.body.pass, res);    
})

router.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.pass, salt);
    let queryConstruct = `INSERT INTO users(username,password) 
    VALUES (
        '${req.body.user}',
        '${secPass}'
    )`
    signupQuery(queryConstruct, `added new user`, res)
})

module.exports = router;