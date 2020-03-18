var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    author : String,
    feedback : String
})


module.exports = mongoose.model("comment",userSchema);