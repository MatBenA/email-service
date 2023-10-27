const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const usersDB = require("../model/usersModel");
require("dotenv").config();

app.post("/api/email/login", login);

async function login(req, res) {
    usersDB.loginData(req.body, (err, result, match) => {
        if (err) return res.status(500).send(err);
        if (result === "404" || !match)
            return res.status(404).send("Invalid user or password");

        const user = JSON.stringify(result[0]);
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
        });
        res.json({ token });
    });
}

module.exports = app;
