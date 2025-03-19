const userRouter = express.Router();
const express = require("express");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const { z } = require("zod");

const secret = process.env.JWT_SECRET;


// const mongoose= require("mongoose");

// console.log("JT_SECRET: ", secret);
// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);



router.get("/user", (req, res) => {


})

module.exports = router;

