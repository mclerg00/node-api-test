const fs = require("fs");

// Function to save data to the coresponding JSON file.
const saveToDB = (DBName, data) => {
    fs.writeFileSync(`./DB/${DBName}.json`, JSON.stringify(data, null, 2), {
        encoding: "utf8",
    });
};

// Function to get the response message based on the response code.
const getResponseMessage = (response) => {
    switch (response) {
        case 400:
            return { status: 400, message: "Bad Request, invalid parameters provided in the request body or the request body is empty" };
        case 401:
            return { status: 401, message: "Unauthorized, invalid credentials provided" };
        case 404:
            return { status: 404, message: "Not Found" };
        case 409:
            return { status: 409, message: "Conflict, a client there is already a resource with this value for this client, check address and email values" };
        case 500:
            return { status: 500, message: "Internal Server Error" };
        default:
            return { status: 500, message: "Internal Server Error" };
    }
};

module.exports = {
    saveToDB,
    getResponseMessage,
};