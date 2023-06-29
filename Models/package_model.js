const mongoose = require('mongoose');


const buypackege = mongoose.Schema({
    price: {
        type: String, 
    }, 
    valid: {
        type: String
    }, 
    desc: {
        type: String
    }, 
    image: {
        type: String
    }
})


const BuyPackege = mongoose.model('package', buypackege);

module.exports = BuyPackege;