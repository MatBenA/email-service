//initial config
const express = require("express");
const app = express();
const config = require("./config.json");


app.listen(config.server.port, (err) => {
    if (err) return console.log(err);
    console.log(`Listening at port ${config.server.port}`);
});
