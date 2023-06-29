const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    review: {
        type: String,
    },
    star_rating: {
        type: Number,
        required: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
    }
}, {
    timestamps: true,
});

const ReviewModel = mongoose.model('reviewservice', ReviewSchema);
module.exports = ReviewModel;