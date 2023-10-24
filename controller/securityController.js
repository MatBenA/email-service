const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.post("api/mail/login", login);

async function login(req, res){
    
}
