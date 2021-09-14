const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [6, 'Product name cannot exceed 6 characters'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0.0
    },
    sellerCompany: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    image: {
        url: {
            type: String,
            required: true
        },
        orjname: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'advertiserUser',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);