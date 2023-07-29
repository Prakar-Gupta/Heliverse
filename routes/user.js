const express = require('express')
const userSchema = require('../model/User')
const data = require('../data.json')
const router = express.Router()

router.post('/users', async (req, res) => {
    try {
        for (const userData of data) {
            const user = new userSchema({
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                gender: userData.gender,
                avatar: userData.avatar,
                domain: userData.domain,
                available: userData.available || false,
            });
            await user.save();

        }

        res.status(201).json({ message: 'Users created and saved successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await userSchema.find()
        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
router.get('/users/:id', async (req, res) => {
    try {
        const userid = Number(req.params.id)
        const user = await userSchema.findOne({ id: userid })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user)

    }
    catch (err) {
        res.status(500).json(err)
    }
})
router.put('/users/:id', async (req, res) => {
    try {
        const userid = Number(req.params.id)
        const updatedUser = await userSchema.findOneAndUpdate(
            { id: userid },
            {
                $set: req.body
            },
            { new: true }
        )
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err)
    }
})
router.delete('/users/:id', async (req, res) => {
    try {
        const userid = Number(req.params.id)
        const user = await userSchema.deleteOne({ id: userid })
        res.status(200).json(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router