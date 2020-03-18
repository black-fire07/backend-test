var mongoose = require('mongoose');
var passportlocalmongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    author : Schema.Types.ObjectId
})

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("user",userSchema)