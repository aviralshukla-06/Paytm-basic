const express = require("express");
const userMiddleware = require("../middlewares/usermid");
const { default: mongoose } = require("mongoose");
const { Account } = require("../db");
const paymentRouter = express.Router();

// Define payment routes here
paymentRouter.get("/checkbal", userMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

// console.log("working payment");

paymentRouter.post("/transfer", userMiddleware, async function (req, res) {
    const session = await mongoose.startSession();
    // wrap all money transfer logic here

    session.startTransaction();
})

module.exports = paymentRouter;  // ✅ Make sure it's exported like this
