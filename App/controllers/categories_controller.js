const express = require('express')
const router = express.Router()
const { Category } = require('../models/category')
const { authenticateUser } = require('../middleware/authenticate')
const { authorization } = require('../middleware/authorization')

//create a category
router.post('/', authenticateUser, authorization, (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
})

//Retrive all data
router.get('/', (req, res) => {
    Category.find()
        .then((categories) => {
            res.send(categories)
        })
        .catch((err) => {
            res.send(categories)
        })
})

//edit the data
router.put('/:_id', authenticateUser, authorization, (req, res) => {
    const category = req.body
    const _id = req.params._id
    Category.findOneAndUpdate(_id, category, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
})

//delete 
router.delete('/:_id', authenticateUser, authorization, (req, res) => {
    const _id = req.params._id
    Category.findOneAndDelete(_id)
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    categoriesRouter: router
}
