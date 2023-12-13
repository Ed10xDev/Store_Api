require('dotenv').config()
require('express-async-errors')

// TODO: async errors

const errorHandler = require('./middleware/errorHandler')
const notFoundHandler = require('./middleware/notFound')
const connectDB = require('./database/connect')
const productsRoutes = require('./routes/productsRoute')

const express = require('express')
const app = express()

app.use(express.json()) // acessing json from the req.body

// routes
app.get('/', (req, res) => {
    res.send(
        `<h1>Store API</h1> <br> <a href="/api/v1/products">Product route</a>`
    )
})

// TODO: products route
app.use('/api/v1/products', productsRoutes)

// * error middlwares
app.use(notFoundHandler)
app.use(errorHandler)

//* server

const PORT = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
