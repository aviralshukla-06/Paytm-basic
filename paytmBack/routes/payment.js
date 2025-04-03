const express = require("express");
const userMiddleware = require("../middlewares/usermid");
const { default: mongoose } = require("mongoose");
const { Account, User } = require("../db");
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
    session.startTransaction();

    const { amount, username } = req.body;

    try {
        // 🔍 Find sender's account
        const userAcc = await Account.findOne({ userId: req.userId }).session(session);
        if (!userAcc || userAcc.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // 🔍 Convert `username` to `userId`
        const receiver = await User.findOne({ username });
        if (!receiver) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid username" });
        }

        // 🔍 Find receiver's account
        const toAccount = await Account.findOne({ userId: receiver._id }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Receiver does not have an account" });
        }

        // 💰 Transfer money
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: receiver._id }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        session.endSession();
        return res.json({ message: "Transfer successful" });

    } catch (error) {
        console.error("Transfer Error:", error); // 🔍 Log actual error
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Transfer failed", error: error.message });
    }
});


module.exports = paymentRouter;  // ✅ Make sure it's exported like this
