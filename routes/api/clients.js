const express = require("express");
const router = express.Router();
const clientController = require("../../controllers/Clients/clientsController.js");
const addressController = require("../../controllers/Clients/addressController.js");

router
  .route("/:client_id/address/:address_id")
  .delete(addressController.deleteAddress)
  .patch(addressController.updateAddress);

router
  .route("/:client_id/address")
  .post(addressController.addAddress)
  .get(addressController.getAddresses);

router
  .route("/:client_id")
  .get(clientController.getClient)
  .put(clientController.updateClient)
  .delete(clientController.deleteClient)
  .patch(clientController.updateClient);

router
  .route("/")
  .get(clientController.getClients)
  .post(clientController.createClient);

module.exports = router;


