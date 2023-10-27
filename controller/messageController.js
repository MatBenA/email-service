//initial config
const express = require("express");
const messageDB = require("../model/messageModel");
const verifyToken = require("./securityController").verifyToken;
const app = express();

app.post("/api/email/send", verifyToken, createMessage);

function createMessage(req, res) {
    messageDB.create(req.body, (err, result) => {
        if (err) return res.status(500).send(err.code);
        res.send("email sent");
    });
}

module.exports = app;
