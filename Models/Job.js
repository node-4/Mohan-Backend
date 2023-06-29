const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true

        },
        jobcategory: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Category"


        },

        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory",
            // required:true
        },
        Job_name: {
            type: String,
            required: true
        },

        
        Description: {
            type: String,
            required: true
        },
        Job_type: {
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
        
    },
    {
        timestamps: true
    }
);
const Job = mongoose.model('Job', jobSchema)
module.exports = Job










