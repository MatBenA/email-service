//initial config
const mysql = require("mysql");
const configDB = require("../config.json")

//connect to database
const connection = mysql.createConnection(configDB.database);

connection.connect(err => {
    if (err) return err;
    console.log(`users connected tod DB`);
})

const usersDB = {}

usersDB.create = function(userData, callBack){
    const newUser = Object.values(userData);
    const request = "INSERT INTO users (user_name, email, first_name, last_name, password) VALUES (?,?,?,?,?);";
    connection.query(request, newUser, (err, result) => {
        if(err) return callBack(err.code);
        callBack(null, result);
    })
}

module.exports = usersDB;