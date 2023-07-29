const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        default: 'team',
    },
    users: [
        {
            id: {
                type: Number,
                ref: 'User'
            },
            avatar: {
                type: String,
                ref: 'User'
            },
        }
    ]
})

module.exports = mongoose.model("Team", teamSchema);