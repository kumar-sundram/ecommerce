const mongoose = require('mongoose')
// DB CONFIGURATION
// telling mongoose to use es6's promise library
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true })
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('Error connecting to DB', err)
    })

module.exports = {
    mongoose
}