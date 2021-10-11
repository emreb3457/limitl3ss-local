const mongoose = require('mongoose');

const newsandannounSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
        maxLength: [100, 'Title cannot exceed 100 characters']
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
    catergory: {
        type: String,
        required: true,
        enum: {
            values: [
                'News',
                'Announcement',
            ],
            message: 'Please select correct category.'
        }
    },
    link: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Newsandannoun", newsandannounSchema)