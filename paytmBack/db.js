require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objId = mongoose.Types.ObjectId;

const { type } = require('express/lib/response');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);

// console.log(mongoURI);

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 10,
        maxLength: 30
    },
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 10,
        maxLength: 30
    },
    password: {
        type: String,
        require: true,
        minLength: 8,
    },
    firstname: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 30
    },
    lastname: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 30
    }
});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
})

const User = mongoose.model("users", userSchema);
const Account = mongoose.model("balance", accountSchema);

module.exports = {
    User,
    Account
}