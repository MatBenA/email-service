//initial config
const express = require("express");
const app = express();
const config = require("./config.json");
app.use(express.json());

const securityController = require("./controller/securityController");
app.use(securityController.app);

const usersController = require("./controller/usersController");
app.use(usersController);

const messageController = require("./controller/messageController");
app.use(messageController);

const settingsConstroller = require("./controller/settingsController");
app.use(settingsConstroller);

app.listen(config.server.port, (err) => {
    if (err) return console.log(err);
    console.log(`Listening at port ${config.server.port}`);
});
