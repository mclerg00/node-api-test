const data = {};
data.clients = require("./clients.json");
data.name = "clients";
const { saveToDB } = require("./utils.js");
const { getClient } = require("./clients.js");

const getAddress = (client_id, address_id) => {
    const client = getClient(client_id);
    if (!client) return;

    return client.addresses.find(address => address.address_id == address_id);
}

const addAddress = (client_id, address) => {
    const client = getClient(client_id);
    if (!client) return;

    if (addressInUse(client_id, address)) return;

    address.address_id = client.addresses.length + 1;
    client.addresses.push(address);
    saveToDB(data.name, data.clients);
    return address;
}

//Update an address by id, only the fields that are passed will be updated, if htey are null or undefined, the old value will be kept
const updateAddress = (client_id, address_id, address) => {
    const client = getClient(client_id);
    if (!client) return;

    if (addressInUse(client_id, address)) return;

    if (typeof address_id == "string") {
        address.address_id = parseInt(address_id);
    }
    else {
        address.address_id = address_id;
    }

    const addressIndex = client.addresses.findIndex(address => address.address_id == address_id);
    if (addressIndex < 0) return;
    
    const newAddress = {
        address_id: address.address_id,
        street: address.street ? address.street : client.addresses[addressIndex].street,
        city: address.city ? address.city : client.addresses[addressIndex].city,
        country: address.country ? address.country : client.addresses[addressIndex].country,
    };


    client.addresses[addressIndex] = newAddress;
    saveToDB(data.name, data.clients);
    return client.addresses;
}

const deleteAddress = (client_id, address_id) => {
    const client = getClient(client_id);
    if (!client) return;

    if (client.addresses.length == 1) return;

    const addressIndex = client.addresses.findIndex(address => address.address_id == address_id);
    if (addressIndex < 0) return;
    client.addresses.splice(addressIndex, 1);
    saveToDB(data.name, data.clients);
    return client.addresses;
}

const getAddresses = (client_id) => {
    const client = getClient(client_id);
    if (!client) return;
    return client.addresses;
}

//Check if an address is already in use by this client
const addressInUse = (client_id, address) => {
    const client = getClient(client_id);
    if (!client) return;
    return client.addresses.find(add => add.street == address.street && add.city == address.city && add.country == address.country);
}

module.exports = {
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    addressInUse,
    getAddresses
}