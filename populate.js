require('dotenv').config()

const connectDB = require('./database/connect')
const Products = require('./database/models/Products')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Products.deleteMany()
        await Products.create(jsonProducts)
        console.log('success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
