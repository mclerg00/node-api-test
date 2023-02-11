const authService = require("../services/authService");

const registerAccount = async (req, res) => {
    try {
        res.status(201).json(await authService.registerAccount(req.body));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};
const loginAccount = async (req, res) => {
    try {
        res.status(200).json(await authService.loginAccount(req.body));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        await authService.deleteAccount(req.body);
        res.status(200).json("Client deleted");
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};

module.exports = {
    registerAccount,
    loginAccount,
    deleteAccount,
};
