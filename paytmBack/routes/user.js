const { Router, json } = require("express");
const userauth = require("../middlewares/usermid")
const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const { User, Account } = require("../db")

const secret = process.env.JWT_SECRET;



// const mongoose= require("mongoose");

// console.log("JT_SECRET: ", secret);
// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);


userRouter.post("/signup", async function (req, res) {
    const reqBody = z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string(),
        firstname: z.string(),
        lastname: z.string()
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


    const { email, username, password, firstname, lastname } = parsedBody.data;
    const hashedPass = await bcrypt.hash(password, 7);

    try {
        const newuser = await User.create({
            email,
            username,
            password: hashedPass,
            firstname,
            lastname
        })

        await Account.create({
            userId: newuser._id,
            balance: 1000
        })

        // console.log(newuser);
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
        return res.status(403).json({
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
        return res.status(403).json({
            message: "Incorrect details"
        });
    }

});


// user information updation
const updatedBody = z.object({
    password: z.string().optional(),
    username: z.string().optional(),
    firstname: z.string().optional(),  // Ensure the field names match the schema
    lastname: z.string().optional(),
});

userRouter.put("/update", userauth, async function (req, res) {
    const success = updatedBody.safeParse(req.body);

    if (!success.success) {
        return res.status(411).json({
            message: "Error while updating info."
        });
    }

    try {
        const result = await User.updateOne(
            { _id: req.userId },   // Filter: Find user by ID
            { $set: req.body }     // Update: Modify provided fields
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "No updates made. Check input values." });
        }

        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// get all users with given name

userRouter.get("/bulk", async function (req, res) {
    const filterStr = req.query.filterStr || "";

    const foundUsers = await User.find({
        $or: [{                                    // match both first and last name to filter, hence used "or"
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]

    })

    res.json({
        user: foundUsers.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })

})


module.exports = userRouter;

