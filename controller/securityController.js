const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const usersDB = require("../model/usersModel");

app.post("/api/email/login", login);

async function login(req, res) {
    usersDB.loginData(req.body, (err, result, match) => {
        if (err) return res.status(500).send(err);
        if (result === "404" || !match)return res.status(404).send("Invalid user or password");
        
        const token = jwt.sign()
    });
}

module.exports = app;
