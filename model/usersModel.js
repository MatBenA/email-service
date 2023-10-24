//initial config
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const configDB = require("../config.json");

//connect to database
const connection = mysql.createConnection(configDB.database);

connection.connect((err) => {
    if (err) return console.log(err);
    console.log(`users connected to DB`);
});

const usersDB = {};

//data required: username - email - first name - last name - password
usersDB.create = async function (userData, callBack) {

    //encrypt password
    userData.password = await bcrypt.hash(userData.password, 10);
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
