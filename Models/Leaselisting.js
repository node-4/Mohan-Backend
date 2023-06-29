const mongoose = require('mongoose')
const leaselistingSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        leaselistingcategory: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Category"


        },

        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory",
            required:true
        },
        Property_name: {
            type: String,
            required: true
        },

        
        Description: {
            type: String,
            required: true
        },
        Product_price: {
            type: Number,
            required: true
        },
        Contact_number: {
            type: Number,
            required: true
        },

        Location: {
            type: String,
            required: true
        },

        
        leaselistingPictures: [
            { img: { type: String } }
        ],




       
        
    },
    {
        timestamps: true
    }
);
const Leaselisting = mongoose.model('Leaselisting', leaselistingSchema)
module.exports = Leaselisting










