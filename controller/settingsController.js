const settingsDB = require("../model/settingsModel");
const { verifyToken } = require("./securityController");
const express = require("express");
const app = express();

app.post("/api/email/newsetting", verifyToken, createSettings);
app.post("/api/email/selectservice", verifyToken, selectService);

function createSettings(req, res) {
    const email = req.user.email;
    const serviceData = Object.values(req.body);
    settingsDB.new(serviceData, email, (err, result) => {
        if (err) return res.status(500).send(err.code);
        res.send("New service added succesfully.");
    });
}

function selectService(req, res) {
    const service = req.body.service_name;
    const username = req.user.user_name;
    settingsDB.select([service, username], (err, result) => {
        if(err) return res.status(500).send(err.code);
        res.send("service selected");
    });
}

module.exports = app;
