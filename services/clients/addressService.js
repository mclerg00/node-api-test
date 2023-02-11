const res = require("express/lib/response.js");
const address = require("../../DB/address.js");
const { getResponseMessage } = require("../../DB/utils.js");
const { getClient } = require("./clientsService.js");

//Address server functions to get, add, update and delete addresses.
const addAddress = (req) => {
    const { body: { street, city, country }, params: { client_id } } = req;
    if (!client_id || !street || !city || !country) throw getResponseMessage(400);

    if (!getClient(client_id)) throw getResponseMessage(404);

    if (address.addressInUse(client_id, { street, city, country })) throw getResponseMessage(409);

    return address.addAddress(client_id, { street, city, country });
};

//Delete an address by id.
const deleteAddress = (req) => {
    const { params: { client_id, address_id } } = req;
    if (!client_id || !address_id) throw getResponseMessage(400);

    if (!getClient(client_id)) throw getResponseMessage(404);

    if (!address.getAddress(client_id, address_id)) throw getResponseMessage(404);

    return address.deleteAddress(client_id, address_id);
};

//Update an address by id, used for the PATCH request.
//At leats one parameter must be present in the body between street, city and country.
const updateAddress = (req) => {
    const { body: { street, city, country }, params: { client_id, address_id } } = req;
    if (!client_id || !address_id || (!street && !city && !country)) throw getResponseMessage(400);

    if (!getClient(client_id)) throw getResponseMessage(404);

    if (!address.getAddress(client_id, address_id)) throw getResponseMessage(404);

    if (address.addressInUse(client_id, { street, city, country })) throw getResponseMessage(409);

    return address.updateAddress(client_id, address_id, { address_id, street, city, country });
};

//Retrieve all addresses for a specific client.
const getAddresses = (req) => {
    const { params: { client_id } } = req;
    if (!client_id) throw getResponseMessage(400);

    if (!getClient(client_id)) throw getResponseMessage(404);

    return address.getAddresses(client_id);
};

module.exports = {
    addAddress,
    deleteAddress,
    updateAddress,
    getAddresses
};
