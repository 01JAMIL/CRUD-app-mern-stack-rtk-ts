const express = require('express')
const router = express.Router()
const { getProducts, getProductById, saveProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', saveProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router