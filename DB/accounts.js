const data = {};
data.accounts = require("./accounts.json");
data.name = "accounts";
const { saveToDB } = require("./utils.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Functions to register, login and delete admin accounts
const registerAccount = async (email, password) => {
    const account = {
        email,
        password: await bcrypt.hash(password, 10)
    }
    if (data.accounts.find(acc => acc.email == email)) return;

    data.accounts.push(account);
    saveToDB(data.name, data.accounts);
    return "Accout created"
};

const loginAccount = async (email, password) => {
    const foundUser = await checkCredentials(email, password);
    if (!foundUser) return;

    //Create access and refresh tokens
    const accessJWT = jwt.sign({ email: foundUser.email }, process.env.ACCESS_JWT_SECRET, { expiresIn: "10m" });
    const refreshJWT = jwt.sign({ email: foundUser.email }, process.env.REFRESH_JWT_SECRET, { expiresIn: "1d" });
    
    //Update refresh token in DB
    const userIndex = data.accounts.findIndex(acc => acc.email == email);
    data.accounts[userIndex].refreshJWT = refreshJWT;
    saveToDB(data.name, data.accounts);

    return {access_token: accessJWT, refresh_token: refreshJWT};
}

const deleteAccount = async (email, password) => {
    const foundUser = await checkCredentials(email, password);
    if (!foundUser) return;

    const userIndex = data.accounts.findIndex(acc => acc.email == email);
    data.accounts.splice(userIndex, 1);
    saveToDB(data.name, data.accounts);
    return "Account deleted";
}

//Helper function to check if the credentials are correct
const checkCredentials = async (email, password) => {
    const foundUser = data.accounts.find(acc => acc.email == email);
    if (!foundUser) return;

    if (!await bcrypt.compare(password, foundUser.password)) return;
    return foundUser;
}

module.exports = {
    registerAccount,
    loginAccount,
    deleteAccount
};