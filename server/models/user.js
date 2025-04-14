const mongoose = require("mongoose");
const tasks = require("./tasks");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },

    tasks:[
    {
        type: Schema.Types.ObjectId,
        ref: "Task",
    },
    ]
});

module.exports = mongoose.model("User",userSchema)

