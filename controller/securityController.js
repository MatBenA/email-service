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

        //generate and send validation tokens
        const token = jwt.sign(result, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "25m",
        });
        const refreshToken = jwt.sign(result, process.env.REFRESH_TOKEN_SECRET);
        res.json({ token, refreshToken });
    });
}

function verifyToken(req, res, next) {
    const accessToken = req.body.accessToken;
    if (!accessToken) return res.status(401).send("An error has ocurred.");
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("An error has occured.");
        req.user = user;
        next();
    });
}

module.exports = { app, verifyToken };
