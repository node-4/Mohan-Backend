const mongoose = require('mongoose');

const Ads = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    image: {
        type: String
    },
    price: {
        type: String
    }, 
    name: {
        type: String
    }, 
    desc: [{
        speed: {
            type: String, 
        },
        width: {
            type: String
        }, 
        capacity: {
            type: String
        },
        modelName: {
           type: String 
        }, 
        brand: {
            type: String
        }, 
        modelNo : {
            type: String
        }
    }],
    features: {
        type: String
    }, 
    company: {
        type: String
    }, 
    info: {
        type: String
    }
})


