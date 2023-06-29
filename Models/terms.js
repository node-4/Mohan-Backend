const mongoose = require('mongoose');


const termsSchema = mongoose.Schema({
    terms: {
        type: String
    }
})



module.exports = mongoose.model('terms', termsSchema);