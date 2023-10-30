//initial config
const nodemailer = require("nodemailer");
const mysql = require("mysql");
const configDB = require("../config.json");

//create db connection
const connection = mysql.createConnection(configDB.database);

connection.connect((err) => {
    if (err) return console.log(err);
    console.log("messages connected to DB");
});

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

async function sendEmail() {
    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "nodeemailer4@gmail.com",
            pass: "tuie atlj awad rvyl",
        },
    };

    const message = {
        from: "nodeemailer4@gmal.com",
        to: "nodeemailer4@gmail.com",
        subject: "testing",
        text: "Sending email from nodejs using nodemailer.",
    };

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(message);

    console.log(info);
}

module.exports = messagesDB;
