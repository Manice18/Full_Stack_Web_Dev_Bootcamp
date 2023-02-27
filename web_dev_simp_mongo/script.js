const mongoose = require('mongoose');
const User = require("./User");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost/testdb");

run()
async function run(){
    const user = await User.deleteOne({name: "Manish"})
    console.log(user);
    // const user = new User({name: "Manish",age: 19}) //creating a new user
    // await user.save() // to save the user to the database we call the user.save() function, this is an async func
    console.log(user)
}
