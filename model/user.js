const mongoose = require("mongoose");

// Define user schema
const userSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    dateOfBirth: String,
    gender: String,
});

module.exports = mongoose.model("User", userSchema);
