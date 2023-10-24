const usersDB = require("../model/usersModel");
const express = require("express");
const app = express();

app.post("/api/email/user", createUser);

function createUser(req, res) {
    const userData = req.body;
    usersDB.create(userData, (err, result) => {
        if(err) return res.status(500).send(err);
        res.send("user created succesfully");
    });
}

module.exports = app;