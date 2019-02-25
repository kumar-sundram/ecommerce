const express = require('express')
const mongoose = require('./config/database')
const { productsRouter } = require('./App/controllers/products_controller')
const { categoriesRouter } = require('./App/controllers/categories_controller')
const { usersRouter } = require('./App/controllers/users_controller')

const app = express()
const port = 3000

app.use(express.json())


app.get('/', (req, res) => {
    res.send('welcome to ecommerce')
})

app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log('listening to port', port)
})


