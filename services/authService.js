const res = require("express/lib/response.js");
const accounts = require("../DB/accounts.js");
const { getResponseMessage } = require("../DB/utils.js");

const registerAccount = async (body) => {
    const { email, password } = body;
    if (!email || !password) throw getResponseMessage(400);

    const result = await accounts.registerAccount(email, password);
    if (!result) throw getResponseMessage(409);
    return result;
}

const loginAccount = async (body) => {
    const { email, password } = body;
    if (!email || !password) throw getResponseMessage(400);

    const result = await accounts.loginAccount(email, password);
    if (!result) throw getResponseMessage(400);
    return result;
}

const deleteAccount = async (body) => {
    const { email, password } = body;
    if (!email || !password) throw getResponseMessage(400);

    const result = await accounts.deleteAccount(email, password);
    if (!result) throw getResponseMessage(404);

    return result;
}

module.exports = {
    registerAccount,
    loginAccount,
    deleteAccount,
};
