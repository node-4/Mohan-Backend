const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: false

        },
        image:{
            type: String
        },
        productcategory: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Category"


        },

        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory",
            // required:true
        },
        Product_name: {
            type: String,
            required: true
        },

        
        Description: {
            type: String,
            required: true
        },
        Product_type: {
            type: String,
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

        // Job_category: {
        //     type: String,
        //     required: true
        // },
        status: {
            type: String, 
            default: "dissApprove"
        }  
        
    },
    {
        timestamps: true
    }
);
const Product = mongoose.model('Product', productSchema)
module.exports = Product










