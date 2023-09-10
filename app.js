require('dotenv').config()

const express = require('express')
const app = express()

const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

//swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
/*const swaggerDocument = YAML.load('./swagger.yaml')*/

const dbConnect = require('./config/db')
const queryRoute = require('./routes/queryRoute')


app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100
    })
    )
app.use(helmet())
app.use(cors())
app.use(express.json())

/*app.get('/', (req, res) => {
    res.send('<h1>E commerce</h1><a href="/api-docs">Documentation</a>')
    })
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))*/

app.use('/api', queryRoute)
    
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