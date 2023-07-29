const express = require('express')
const userSchema = require('../model/User')
const teamSchema = require('../model/Team')
const router = express.Router()

router.post('/team', async (req, res) => {
    try {
        const { team_name } = req.body;

        // Check if the team with the given team_name already exists
        const existingTeam = await teamSchema.findOne({ team_name });

        if (existingTeam) {
            return res.status(400).json({ error: 'Team already exists' });
        }

        // Create a new team with the given team_name
        const newTeam = new teamSchema({ team_name });
        await newTeam.save();

        res.status(201).json(newTeam);
    }
    catch (err) {
        res.status(500).json(err)
    }

})


router.post("/addUserToTeam", async (req, res) => {
    try {
        const { userId, avatar } = req.body;
        const user = await userSchema.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const team = await teamSchema.findOne({ team_name: "team1" });
        if (!team) {
            // Create a new team if it doesn't exist
            const newTeam = new teamSchema({ team_name: "team1" });
            await newTeam.save();
        }

        // Update the team's users array
        await teamSchema.findOneAndUpdate(
            { team_name: "team1" },
            { $addToSet: { users: { id: userId, avatar: avatar } } },
            { new: true }
        );

        res.status(200).json({ message: "User added to the team successfully" });
    } catch (err) {
        console.error("Error adding user to team:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/team', async (req, res) => {
    try {
        const teams = await teamSchema.find()
        res.status(200).json(teams)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router