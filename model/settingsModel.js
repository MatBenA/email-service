// initial config
const mysql = require("mysql");
const configDB = require("../config.json");

//connect to database
const connection = mysql.createConnection(configDB.database);

connection.connect((err) => {
    if (err) return console.log(err);
    console.log(`settings connected to DB`);
});

const usersDB = {};

usersDB.newSettings = function (serviceData, email, callBack){

    const query = "INSERT INTO server_settings (service_name, api_key, domain, user_id) SELECT ?, ?, ?, u.user_id FROM users u WHERE u.email = ?;";

    connection.query(query, [...serviceData, email], (err, result) => {
        if(err) return callBack(err);
        callBack(null, result);
    })
}

module.exports = usersDB;