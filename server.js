const express = require("express");
const { eventLogger } = require("./middleware/log");
const jwtCheck = require("./middleware/JWTChecker.js");
const cors = require('cors')

const PORT = process.env.PORT || 5000;
const server = express();

server.use(eventLogger);
server.use(express.json());
server.use(cors())

server.use("/api/auth", require("./routes/api/auth"));

server.use(jwtCheck);
server.use("/api/clients", require("./routes/api/clients"));

//everything that reachs here is a 404
server.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});