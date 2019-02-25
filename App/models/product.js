const mongoose = require('mongoose')
const { Schema } = mongoose
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 5
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        min: 1,
        required: true
    },
    stock: {
        type: Number,
        Min: 0
    },
    codEligible: {
        type: Boolean,
        default: true,
        required: true
    },
    availableFrom: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = {
    Product
}