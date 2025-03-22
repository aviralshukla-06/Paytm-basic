require('dotenv').config();
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedData = jwt.verify(token, secret);
        req.userId = decodedData.id;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
}

module.exports = userMiddleware;
