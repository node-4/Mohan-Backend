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
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
}, {
    timestamps: true,
});

const ReviewModel = mongoose.model('review', ReviewSchema);
module.exports = ReviewModel;