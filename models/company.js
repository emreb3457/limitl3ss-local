const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyname: {
        type: String,
        required: [true, 'Please enter company name'],
        maxLength: [20, 'Your name cannot exceed 20 characters']
    },
    vatID: {
        type: String,
    },
    instantMessage: {
        type: String,
        default: '',
        // required: [true, 'Please enter instant Message'],
    },
    website: {
        type: String,
    },
    sector: {
        type: String,
        maxLength: [20, 'Your sector cannot exceed 20 characters']
    },
    companyCountry: {
        type: String,
        required: [true, 'Please enter company country'],
    },
    address: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
})
module.exports = mongoose.model("Company", companySchema)
