const express = require("express");
const paymentRouter = express.Router();

// Define payment routes here
paymentRouter.get("/", (req, res) => {
    res.json({ message: "Payment API working!" });
});

// console.log("working payment");

module.exports = paymentRouter;  // ✅ Make sure it's exported like this
