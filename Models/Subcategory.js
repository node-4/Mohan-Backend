const mongoose = require("mongoose")
const SubcategorySchema = new mongoose.Schema({

    Category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
      subcategory:{
        type: String,
        required: true,
        unique:true
    },
    SubcategoryImg:{
        type: String,
        required:true
    }
})


// SubcategorySchema.virtual('products', { 
//     ref: 'Product',
//     localField:'_id',
//     foreignField:'owner'
//   })
module.exports = mongoose.model("Subcategory", SubcategorySchema)