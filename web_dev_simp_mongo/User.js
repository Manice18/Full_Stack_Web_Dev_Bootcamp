// we used another file for writing our schemas and then export that in our main file
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model("User",userSchema);