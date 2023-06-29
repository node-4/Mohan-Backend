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
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Machine'
    }
}, {
    timestamps: true,
});

const ReviewModel = mongoose.model('reviewmachine', ReviewSchema);
module.exports = ReviewModel;