const express = require('express')
const router = express.Router()
const { User } = require('../models/user')

//retrive
router.get('/', (req, res) => {
    User.find()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})

//register a user
router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send({
                user,
                notice: "succefully registered"
            })
        })
        .catch((err) => {
            res.send(err)
        })
})

//login
router.post('/login', (req, res) => {
    const body = req.body
    User.findByEmailAndPassword(body.email, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((token) => {
            res.send({
                token
            })
        })
        .catch((err) => {
            res.status('404').send(err)
        })
})



module.exports = {
    usersRouter: router
}