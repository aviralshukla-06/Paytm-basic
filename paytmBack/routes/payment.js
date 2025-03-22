const express = require("express");
const userMiddleware = require("../middlewares/usermid");
const { default: mongoose } = require("mongoose");
const paymentRouter = express.Router();

// Define payment routes here
paymentRouter.get("/checkBal", userMiddleware, (req, res) => {

});

// console.log("working payment");

paymentRouter.post("/transfer", userMiddleware, async function (req, res) {
    const session = await mongoose.startSession();

    session.startTransaction();
})

module.exports = paymentRouter;  // ✅ Make sure it's exported like this
