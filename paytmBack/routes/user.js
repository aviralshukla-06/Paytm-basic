const { Router, json } = require("express");

const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
    // console.log(parsedBody);
    const errMsg = parsedBody.error;

    if (!parsedBody.success) {
        res.status(403).json({
            message: errMsg
        })
        return;
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.json({
            message: "User with this name already exists"
        })
    }


    const { email, password, firstName, lastName } = parsedBody.data;
    const hashedPass = await bcrypt.hash(password, 7);

    try {
        await userSchema.create({
            email,
            password: hashedPass,
            firstName,
            lastName
        })
    } catch (e) {
        // console.log(e);
        res.sendstatus(500).json({
            message: "An error occurred while creating the user"
        })
        return;
    }

    res.json({
        message: "You have successfully signed-up"
    });

});

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const signingUser = await User.findOne({
        email: email
    })

    if (!signingUser) {
        return res.sendStatus(403).json({
            message: "User does Not exist."
        });
    }

    const matchPass = await bcrypt.compare(password, signingUser.password);

    if (matchPass) {
        const token = jwt.sign({
            id: signingUser._id
        }, secret);
        res.json({
            token: token
        });
    } else {
        res.sendStatus(403).json({
            message: "Incorrect details"
        });
    }

});

module.exports = userRouter;

