const addressService = require("../../services/clients/addressService");

const addAddress = (req, res) => {
    try {
        res.status(201).json(addressService.addAddress(req));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};

const getAddresses = (req, res) => {
    try {
        res.status(200).json(addressService.getAddresses(req));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};

const deleteAddress = (req, res) => {
    try {
        res.status(200).json(addressService.deleteAddress(req));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};

const updateAddress = (req, res) => {
    try {
        res.status(200).json(addressService.updateAddress(req));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};

module.exports = {
    addAddress,
    deleteAddress,
    updateAddress,
    getAddresses
};
