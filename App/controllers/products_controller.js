const express = require('express')
const router = express.Router()
const { Product } = require('../models/product')
const { authenticateUser } = require('../middleware/authenticate')
const { authorization } = require('../middleware/authorization')
const { upload } = require('../middleware/imageUpload')

//Create a product
router.post('/', upload.single('image'), authenticateUser, authorization, (req, res) => {
    const body = req.body
    const imageUrl = req.file.destination
    body.imageUrl = imageUrl.slice(1) + req.file.filename
    const product = new Product(body)
    product.save()
        .then((product) => {
            res.send(product)
        })
        .catch((err) => {
            res.send(err)
        })
})

//Retrive the all product
router.get('/', (req, res) => {
    Product.find()
        .then((products) => {
            if (products) {
                res.send(products)
            } else {
                res.send({ notice: "there is no product" })
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//edit the product
router.put('/:_id', authenticateUser, authorization, (req, res) => {
    const _id = req.params._id
    const product = req.body
    Product.findOneAndUpdate(_id, product, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
        .then((product) => {
            res.send(product)
        })
        .catch((err) => {
            res.send(err)
        })
})

//delete the product
router.delete('/:_id', authenticateUser, authorization, (req, res) => {
    const _id = req.params._id
    Product.findOneAndDelete(_id)
        .then((product) => {
            res.send(product)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    productsRouter: router
}
