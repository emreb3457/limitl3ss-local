const mongoose = require('mongoose');

const gameAwardsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        maxLength: [50, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],
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
    points: {
        type: Number
    },
    active: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("GameAwards", gameAwardsSchema)