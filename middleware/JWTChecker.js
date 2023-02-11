const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtCheck = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) return res.status(401).json({ message: "No token provided" });

    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
};

module.exports = jwtCheck;