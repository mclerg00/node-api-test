const data = {};
data.clients = require("./clients.json");
data.name = "clients";
const { saveToDB } = require("./utils.js");
const getClients = (params) => {
    let { page, first, city, country } = params;
    let result = [...data.clients];

    result = getFilteredResult(result, city, country);
    result = getPaginatedResult(result, page, first);

    return result && result.length > 0 ? result : null;
}

//Filter the clients by city and country if city and country are non null
const getFilteredResult = (result, city, country) => {
    if (city) {
        result = filterByCity(result, city);
    }
    if (country) {
        result = filterByCountry(result, country);
    }
    return result;
}

//Filter the clients by city
const filterByCity = (result, city) => {
    return result.filter(client => {
        return client.addresses.some(address => {
            return (address.city?.toLowerCase() == city?.toLowerCase());
        })
    });
}

//Filter the clients by country
const filterByCountry = (result, country) => {
    return result.filter(client => {
        return client.addresses.some(address => {
            return (address.country?.toLowerCase() == country?.toLowerCase());
        })
    });
}

//Paginate the clients using page and first
const getPaginatedResult = (result, page, first) => {
    if (result && result.length > 0) {
        if (page || first) {
            if (isNaN(page) && isNaN(first)) return;
            first = !isNaN(first) ? parseInt(first) : 100;
            page = !isNaN(page) ? parseInt(page) : page;
            const limit = (first > 100 ? 100 : first) ?? 100;
            const offset = page ? (page - 1) * limit : 0;
            result = result.slice(offset, offset + limit);
        }
    }
    return result;
}

//Get a specific client by id or email
const getClient = (client_id) => {
    return data.clients.find(client => client.client_id == client_id || client.email == client_id);
}

//Create a new client
const createClient = (body) => {
    const { name, surname, email, phone, addresses, client_id } = body;
    const newClient = {
        client_id: client_id ? client_id : data.clients.length + 1,
        name,
        surname,
        email,
        phone,
        addresses
    }
    
    newClient.addresses = addAddressId(newClient.addresses);

    data.clients.push(newClient);
    saveToDB(data.name, data.clients);
    return newClient;
}

//Update a client taking the client_id from the request params and the body from the request body
//If the email or id is already taken by another client, return 409
const updateClient = (client_id, body) => {
    const clientIndex = data.clients.findIndex(client => client.client_id == client_id);
    if (clientIndex < 0) return null;
    
    if (data.clients.find(client => client.email == body.email && client.client_id != client_id)) return 409;
    
    if (!body.addresses || body.addresses.length < 0) return null;
    let client = {
        ...data.clients[clientIndex],
        ...body
    }

    client.addresses = addAddressId(client.addresses);

    data.clients[clientIndex] = client;
    saveToDB(data.name, data.clients);
    return client;
}

//Add an address_id to each address corresponding to the index of the address in the array
const addAddressId = (addresses) => {
    if(addresses && addresses.length > 0) {
        addresses.forEach((address, index) => {
            address.address_id = index + 1;
        });
    }
    return addresses;
}

const deleteClient = (client_id) => {
    const clientIndex = data.clients.findIndex(client => client.client_id == client_id);
    if (clientIndex < 0) return null;
    data.clients.splice(clientIndex, 1);
    saveToDB(data.name, data.clients);
    return `Client withd client_id=${client_id} deleted`;
}

//Check if the email is already taken by another client
const emailInUse = (email, client_id) => {
    return data.clients.find(client => client.email == email && client.client_id != client_id);
}

module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
    emailInUse
}