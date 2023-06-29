const mongoose = require('mongoose')
const machineSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false

        },
        machinecategory: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Category"


        },

        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory",
            required:true
        },

        Machine_name: {
            type: String,
            required: true
        },
        Condition: {
            type: String,
            required: true
        },
        Price: {
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

        Features: {
            type: String,
            required: true
        },

        About_company: {
            type: String,
            required: true
        },
        Additional_info : {
            type: String
        },


        machinePictures: [],




        Description: {
            Speed: {
                type: String,
            },
            Output_paper_width: {
                type: String,
            
            },
            Capacity: {
                type: String,
                required: true
            },
            Model_name_number: {
                type: String,
                required: true
            },
           
            Brand: {
                type: String,
                required: true
            },
            
            Model_no: {
                type: String,
                required: true
            },

          
        },
    },
    {
        timestamps: true
    }
);
const Machine = mongoose.model('Machine', machineSchema)
module.exports =  Machine










