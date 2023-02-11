# Golf club API example
This is a simple example of a REST API for a golf club. It is written in nodejs and uses express and a emulated database created with json files.

## Installation and usage
To start the server, you need to have nodejs installed. Then, you can install the dependencies and start the server with the following commands:
```
npm install
npm start
```

Apart from this, a postman collection is included in the repository (file "Golf Club API.postman_collection.json"), with some examples of the API usage for all the endpoints.

This collection includes some simple tests scripts that can check response codes, and can copy the token in the authentication endpoints so it can automatically be used in the other endpoints.

## API and DB

The API has been documented with swagger. You can find the documentation at https://mclerg00.github.io/node-api-test/, or in the included golf-club.yaml file.

It supports operations to create, read, update and delete clients and their addresses, as specified in the swagger documentation.

It has authentication with JWT. The endpoints that don't require authentication are marked with the empty security tag in the swagger documentation (security: []), these are used in the "Auth" section to register a new user, with a username and password, and to get a token to use in the other endpoints.

On a DB level, the clients and addresses are stored in the same json file, with the addresses being an array of objects inside the client object (all read, write, delete... operations will work with this files too).

The client_id is used as the primary key for the client (although the email can be used as one too, as it unique for each user too), and the address_id is used as the primary key for the addresses.




