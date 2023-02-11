const res = require("express/lib/response.js");
const clients = require("../../DB/clients.js");
const clientParams = ["name", "surname", "email", "phone", "addresses"];
const { getResponseMessage } = require("../../DB/utils.js");

//Get all clients or a specific subset of clients filtered by max number of clients, page number, city and country.
const getClients = (params) => {
    let result = clients.getClients(params)
    if (!result) throw getResponseMessage(404);

    return result;
};

//Get a specific client by id.
const getClient = (clientId) => {
    if (!clientId) throw getResponseMessage(400);

    let result = clients.getClient(clientId);
    if (!result) throw getResponseMessage(404);

    return result;
};

//Create a new client.
const createClient = (body) => {
    if (!checkValidClientParams(body, clientParams)) throw getResponseMessage(400);

    if (clients.getClient(body.client_id) || clients.getClient(body.email)) throw getResponseMessage(409);
    
    if(!body.addresses || body.addresses.length < 1 || !body.addresses.every(validAddressParams)) throw getResponseMessage(400); 

    const result = clients.createClient(body);
    if (!result) throw getResponseMessage(400);

    return result;
};


//Update a client by id, used for both PUT and PATCH requests.
//If the request is a PATCH request, only the parameters that are present in the body will be updated and checked, in the case of a PUT request all parameters must be present.
const updateClient = (req) => {
    const { body, params: { client_id } } = req;
    if (body.client_id || !checkValidClientParams(body, clientParams, req.method == "PATCH")) throw getResponseMessage(400);

    if (!clients.getClient(client_id)) throw getResponseMessage(404);

    if(!body.addresses || body.addresses.length < 1 || !body.addresses.every(validAddressParams)) throw getResponseMessage(400);

    if (clients.emailInUse(body.email, client_id)) throw getResponseMessage(409);

    const result = clients.updateClient(client_id, body);
    if (!result) throw getResponseMessage(400);

    return result;
};

//Delete a client by id.
const deleteClient = (req) => {
    const { params: { client_id } } = req;
    if (!client_id) throw getResponseMessage(400);

    if (!clients.getClient(client_id)) throw getResponseMessage(404);

    return clients.deleteClient(client_id);
};

//Check if the received parameters are valid for a client.
//"Any" is used to check if at least one of the parameters is present in the body, used for PATCH requests.
const checkValidClientParams = (receivedParams, checkParams, any) => {
    Object.keys(receivedParams);
    return any ?
        Object.keys(receivedParams).some((key) => checkParams.includes(key)) :
        Object.keys(receivedParams).length == checkParams.length && Object.keys(receivedParams).every((key) => checkParams.includes(key));
};

//Check if the received parameters are valid for an address.
const validAddressParams = (address) => {
    const { street, city, country } = address;
    return street && city && country;
};

module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
};
