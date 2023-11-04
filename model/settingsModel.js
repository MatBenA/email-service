// initial config
const mysql = require("mysql");
const configDB = require("../config.json");

//connect to database
const connection = mysql.createConnection(configDB.database);

connection.connect((err) => {
    if (err) return console.log(err);
    console.log(`settings connected to DB`);
});

const settingsDB = {};

settingsDB.new = function (serviceData, email, callBack) {
    const request =
        "INSERT INTO server_settings (service_name, api_key, domain, user_id) SELECT ?, ?, ?, u.user_id FROM users u WHERE u.email = ?;";

    connection.query(request, [...serviceData, email], (err, result) => {
        if (err) return callBack(err);
        callBack(null, result);
    });
};

settingsDB.select = function (service, callBack) {
    const request =
        "UPDATE server_settings AS ss INNER JOIN users AS u ON ss.user_id = u.user_id SET ss.selected = (ss.service_name = ?) WHERE u.user_name = ?;";

    connection.query(request, service, (err, result) => {
        if (err) return callBack(err);
        if (result){}
        callBack(null, result);
    });
};

module.exports = settingsDB;