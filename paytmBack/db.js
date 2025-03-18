require('dotenv').config();

const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// console.log(mongoURI);

const userSchema = mongoose.Schema({
    usrename: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
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

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}