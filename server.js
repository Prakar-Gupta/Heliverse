const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/user')
const teamRoutes = require('./routes/team')
const cors = require('cors')
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', userRoutes)
app.use('/api', teamRoutes)



app.listen(PORT, () => {
    console.log('server is running on', PORT)
})

connectDB()