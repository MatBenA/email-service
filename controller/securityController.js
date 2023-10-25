const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const usersDB = require("../model/usersModel");

app.post("/api/email/login", login);

async function login(req, res) {
    usersDB.loginData(req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
}

module.exports = app;
