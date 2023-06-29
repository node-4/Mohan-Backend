const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false

        },
        servicecategory: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Category"


        },

        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory",
            required:true
        },
        Service_name: {
            type: String,
            required: true
        },

        
        Service_Price: {
            type: Number,
            required: true
        },
        Location: {
            type: String,
            required: true
        },
        Conatct_number: {
            type: Number,
            required: true
        },

        About_service: {
            type: String,
            required: true
        },

        
        servicePictures: [
            { img: { type: String } }
        ],




       
        
    },
    {
        timestamps: true
    }
);
const Service = mongoose.model('Service', serviceSchema)
module.exports =  Service










