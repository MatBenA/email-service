//initial config
const mysql = require("mysql");
const configDB = require("../config.json");

//create db connection
const connection = mysql.createConnection(configDB.database);

//in this object the methods to export will be added
const messagesDB = {};

messagesDB.create = function (messageData, callBack) {
    messageData = Object.values(messageData);
    const request =
        "INSERT INTO messages (subject, message, user_id) VALUES (?, ?, ?);";
    connection.query(request, messageData, (err, result) => {
        if (err) return callBack(err);
        callBack(null, result);
    });
};

module.exports = messagesDB;
