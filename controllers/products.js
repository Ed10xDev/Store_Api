const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: 'get all products static' })
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'get all products' })
}

module.exports = { getAllProducts, getAllProductsStatic }
