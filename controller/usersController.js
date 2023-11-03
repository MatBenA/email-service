const usersDB = require("../model/usersModel");
const { verifyToken } = require("./securityController");
const express = require("express");
const app = express();

app.post("/api/email/user", createUser);

function createUser(req, res) {
    const userData = req.body;
    usersDB.create(userData, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY")
                return res.status(409).send(err.detail);
            return res.status(500).send(err.code);
        }
        if (err) return res.status(500).send(err.code);
        res.status(201).send("user created succesfully");
    });
}

module.exports = app;
