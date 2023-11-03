//initial config
const express = require("express");
const messageDB = require("../model/messageModel");
const { verifyToken } = require("./securityController");
const app = express();

app.post("/api/email/send", verifyToken, createMessage);

function createMessage(req, res) {
    const userData = Object.assign(req.body, req.user);
    messageDB.create(userData, (err, result) => {
        if (err) return res.status(500).send(err.code);
        res.send("email sent");
    });
}

module.exports = app;
