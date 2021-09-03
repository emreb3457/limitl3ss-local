const mongoose = require('mongoose');

const companySchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [20, 'Your name cannot exceed 20 characters']
    },
    vatId: {
        type: String,
    },
    instantMessage: {
        type: String,
        required: [true, 'Please enter instant Message'],
    },
    website: {
        type: String,
        required: [true, 'Please enter web site adress'],
    },
    sector: {
        type: String,
        required: [true, 'Please enter your verticals'],
        maxLength: [20, 'Your name cannot exceed 20 characters']
    },
    country: {
        type: String,
        required: [true, 'Please enter company country'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'publisherUser',
        required: true
    },
})
module.exports=mongoose.model("Company",companySchema)