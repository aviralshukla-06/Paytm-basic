const userRouter = express.Router();
const express = require("express");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const { z } = require("zod");

const { userSchema, User } = require("../db")

const secret = process.env.JWT_SECRET;


// const mongoose= require("mongoose");

// console.log("JT_SECRET: ", secret);
// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);


userRouter.post("/signup", async function (req, res) {
    const reqBody = z.object({
        email: z.string().min(10).max(100).email(),
        password: z.string().min(5).max(100),
        firstName: z.string().min(1).max(100),
        lastName: z.string().min(5).max(100)
    })

    const parsedBody = reqBody.safeParse(req.body);
    console.log(parsedBody);
    const errMsg = parsedBody.error;

    if (!parsedBody.success) {
        res.status(403).json({
            message: errMsg
        })
        return;
    }

    const existingUser = User.findOne({
        userName: body.userName
    })

    if (existingUser.__id) {
        res.json({
            message: "User with this name already exists"
        })
    }


    const { email, password, firstName, lastName } = parsedBody.data;
    const hashedPass = await bycrypt.hash(password, 7);

    try {
        await userSchema.create({
            email,
            password: hashedPass,
            firstName,
            lastName
        })
    } catch (e) {
        console.log(e);
        res.sendStatus(500).json({
            message: "An error occurred while creating the user"
        })
        return;
    }

    res.json({
        message: "You have successfully signed-up"
    });

});

module.exports = userRouter;

