const settingsDB = require("../model/settingsModel");
const { verifyToken } = require("./securityController");
const express = require("express");
const app = express();

app.post("/api/email/newsetting", verifyToken, createSettings);

function createSettings(req, res) {
    const email = req.user.email;
    const serviceData = Object.values(req.body);
    settingsDB.newSettings(serviceData, email, (err, result) => {
        if (err) return res.status(500).send(err.code);
        res.send("New service added succesfully.");
    });
}

module.exports = app;
