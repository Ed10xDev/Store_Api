const Products = require('../database/models/Products')

const getAllProductsStatic = async (req, res) => {
    const products = await Products.find({
        price: { $gt: 30 },
    })
        .sort('price')
        .select('name price')
        .limit(10)
        .skip(5)
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    // * query string parameters
    const { featured, company, name, sort, fields, numericFilters } = req.query

    // * for filtering the products
    const queryObj = {}
    if (featured) {
        queryObj.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObj.company = company
    }
    if (name) {
        queryObj.name = { $regex: name, $options: 'i' }
    }

    // * numeric filtering
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(regEx, (match) => {
            return (match = `-${operatorMap[match]}-`)
        })

        const options = ['price', 'rating']
        // add to the query object
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObj[field] = { [operator]: Number(value) }
            }
        })
    }

    // * for sorting the products
    let result = Products.find(queryObj)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    // * for selecting the products
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // * for skipping and limiting (pagination)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    //* awaiting results
    const products = await result

    res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
