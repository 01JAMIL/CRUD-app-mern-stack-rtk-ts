const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const validateProduct = require('../validation/product.validation')
const Product = require('../models/product.model')

const getProducts = asyncHandler(async (req, res) => {
    await Product.find().then((products) => {
        res.status(200).json(products)
    }).catch((err) => {
        res.status(400).json(err.message)
    })
})

const getProductById = asyncHandler(async (req, res) => {
    await Product.findOne({ _id: req.params.id }).then((product) => {
        res.status(200).json(product)
    }).catch((err) => {
        res.status(400).json(err.message)
    })
})

const saveProduct = asyncHandler(async (req, res) => {
    const { errors, valid } = validateProduct(req.body, req.files, true)
    console.log(req.files)
    if (!valid) {
        return res.status(400).json(errors)
    }
    console.log(req.body)
    const imageName = 'product' + Date.now() + '-' + req.files.image.name
    req.files.image.mv('./uploads/' + imageName)
    const newProduct = new Product(req.body)

    newProduct.image = imageName

    await Product.create(newProduct).then(() => {
        res.status(200).json({ success: 'Product saved successfully' })
    }).catch((err) => {
        res.status(400).json(err.message)
    })

})


const updateProduct = asyncHandler(async (req, res) => {
    const { errors, valid } = validateProduct(req.body, req.files, false)

    if (!valid) {
        return res.status(400).json(errors)
    }

    const updatedProduct = {
        name: req.body.name,
        price: req.body.price
    }

    const product = await Product.findOne({ _id: req.params.id })

    if (req.files && req.files.image.name !== product.image) {
        fs.unlinkSync('./uploads/' + product.image), err => {
            if (err) throw err
        }

        const imageName = 'product' + Date.now() + '-' + req.files.image.name
        req.files.image.mv('./uploads/' + imageName)

        updatedProduct.image = imageName
    }

    await Product.findOneAndUpdate(
        { _id: req.params.id },
        updatedProduct,
        { new: true }
    ).then((product) => {
        res.status(200).json({ success: 'Product updated successfully', product: product })
    }).catch((err) => {
        res.status(400).json(err.message)
    })
})


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })
    fs.unlinkSync('./uploads/' + product.image), err => {
        if (err) throw err
    }
    await Product.findOneAndDelete({ _id: req.params.id }).then(() => {
        res.status(200).json('Product deleted successfully')
    }).catch((err) => {
        res.status(400).json(err.message)
    })
})

module.exports = {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
}