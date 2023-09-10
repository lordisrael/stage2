require('dotenv').config()

const express = require('express')
const app = express()


const dbConnect = require('./config/db')
const queryRoute = require('./routes/queryRoute')

app.use(express.json())
app.use('/api/v1/search', queryRoute)

const port = process.env.PORT||3000

const start = async() => {
    try {
        await dbConnect(process.env.MONGO_URI)
        app.listen(port, () => {
            
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()