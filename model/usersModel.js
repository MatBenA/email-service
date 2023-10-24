//initial config
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const configDB = require("../config.json");

//connect to database
const connection = mysql.createConnection(configDB.database);

connection.connect((err) => {
    if (err) return err;
    console.log(`users connected to DB`);
});

const usersDB = {};

usersDB.create = function (userData, callBack) {
    
    const newUser = Object.values(userData);
    const request =
        "INSERT INTO users (user_name, email, first_name, last_name, password) VALUES (?,?,?,?,?);";
    connection.query(request, newUser, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                if (err.sqlMessage.includes("user_name"))
                    return callBack({
                        code: err.code,
                        detail: "This username already exists",
                    });
                return callBack({
                    code: err.code,
                    detail: "This email already exists",
                });
            }
            return callBack({ code: err.code, detail: err });
        }
        callBack(null, result);
    });
};

module.exports = usersDB;
