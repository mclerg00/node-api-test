const clientsService = require("../../services/clients/clientsService");

const getClients = (req, res) => {
    try {
        res.status(200).json(clientsService.getClients(req.query));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};
const getClient = (req, res) => {
    try {
        res.status(200).json(clientsService.getClient(req.params.client_id));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};
const createClient = (req, res) => {
    try {
        const { body } = req;
        res.status(201).json(clientsService.createClient(body));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};
const updateClient = (req, res) => {
    try {
        res.status(200).json(clientsService.updateClient(req));
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};
const deleteClient = (req, res) => {
    try {
        clientsService.deleteClient(req);
        res.status(200).json("Client deleted");
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message });
    }
};


module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
};
