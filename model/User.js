const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    avatar: {
        type: String,
    },
    domain: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("User", UserSchema);