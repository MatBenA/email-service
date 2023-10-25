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

usersDB.loginData = function (loginData, callBack) {
    let column = "user_name"; //Asume the client sent its username
    if (loginData.user.includes("@")) {
        //if true the identifier is an email
        column = "email";
    }

    const request = `SELECT user_name, email, first_name, last_name, password FROM users WHERE ${column} = ?`;

        connection.query(request, loginData.user, async (err, result) => {
        if(err) return callBack(err);
        //if user was not found
        if(result.length === 0) return callBack(null, "Invalid user or password");
        
        //comparing password received with password from database
        const match = await bcrypt.compare(loginData.password, result[0].password);
        if(!match) return callBack(null, "Invalid user or password");
        
        callBack(null, result);
    });
};

//receive data
//request data from database (user -> password, email, username, firstname, lastname)
//if not found return user not found
//bcrypt compare passwords
//if incorrect return invalid password
//if correct create jwt and return it


module.exports = usersDB;
