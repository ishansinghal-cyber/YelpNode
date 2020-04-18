var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    comment : String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


// var commentSchema = new mongoose.Schema({
//     comment : String,
//     author: String
// });

module.exports = mongoose.model("comments", commentSchema);