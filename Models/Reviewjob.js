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
    job: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    }
}, {
    timestamps: true,
});

const ReviewModel = mongoose.model('reviewjob', ReviewSchema);
module.exports = ReviewModel;