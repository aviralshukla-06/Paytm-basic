const { Router, json } = require("express");
const userauth = require("../middlewares/usermid")
const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const { User } = require("../db")

const secret = process.env.JWT_SECRET;



// const mongoose= require("mongoose");

// console.log("JT_SECRET: ", secret);
// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);


userRouter.post("/signup", async function (req, res) {
    const reqBody = z.object({
        email: z.string().min(10).max(100).email(),
        password: z.string().min(5).max(100),
        firstname: z.string().min(1).max(100),
        lastname: z.string().min(5).max(100)
    })

    const parsedBody = reqBody.safeParse(req.body);
    // console.log(parsedBody);
    const errMsg = parsedBody.error;

    if (!parsedBody.success) {
        return res.status(403).json({
            message: errMsg.issues
        })
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.json({
            message: "User with this name already exists"
        })
    }


    const { email, password, firstname, lastname } = parsedBody.data;
    const hashedPass = await bcrypt.hash(password, 7);

    try {
        const newuser = await User.create({
            email,
            password: hashedPass,
            firstname,
            lastname
        })

        console.log(newuser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "An error occurred while creating the user"
        })

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
        return res.send(403).json({
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
        res.send(403).json({
            message: "Incorrect details"
        });
    }

});


// user information updation
// const updatedBody = z.object({
//     password: z.string().optional(),
//     firstName: z.string().optional(),
//     lastName: z.string().optional(),
// })


// userRouter.put("/", userauth, async function (req, res) {
//     const success = updatedBody.safeParse(req.body);

//     if (!success) {
//         return res.send(411).json({
//             message: "Error while updating info."
//         })
//     }
//     await user.updateOne(req.body, {
//         id: req.userId
//     })

// })

module.exports = userRouter;

