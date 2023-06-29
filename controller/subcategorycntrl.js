const Subcategory = require("../Models/Subcategory");
 var ObjectId = require("mongodb").ObjectID;

exports.addSubcategory = (req,res)=>{
     const newSubcategory = new Subcategory({
      Category: req.body.Category,
        subcategory: req.body.subcategory,
        SubcategoryImg:req.body.image
    });
    newSubcategory.save((error, data) => {
      console.log(newSubcategory,data)
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
          error: error
        });
      }
      if (data) {
        return res.status(201).json({
          user:data
        });
      }
    });
};






// exports.getCategory = async (req, res) => {
//   try {
//     const getCategory = await Category.find({});
//     return res.status(200).json(getCategory);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: error.message });
//   }
// };


exports.getSubcategory = async(req, res) => {
  try{
const result = await Subcategory.find({}).populate('Category')
return res.status(200).send(result)
  }catch (error) {
    console.log(error)
    res.status(500).send(e)
  }
}

exports.getsubcategorybycategory = async(req,res) => {
  try {
    const result = await Subcategory.find({Category: req.params.id})
    return res.status(200).send(result)

  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.getbyid = async (req, res) => {

try{

const result = await Subcategory.find({_id: req.params.id}).populate('Category')
return res.status(200).send(result)
}catch (error) {
  return res.status(500).send(error)
}

}


exports.editSubcategory = async (req, res) => {

  const { subcategory} = req.body
  const SubcategoryImg = req.file ? req.file.filename : null;

  try {
const result = await Subcategory.findByIdAndUpdate({_id: req.params.id},{ 

  subcategory,
  SubcategoryImg: req.body.image
})
 const finalresult = await Subcategory.findById({_id:req.params.id})
return res.status(201).json({message: "Subcategory updated successfully", data: finalresult})
  } catch (error) {
    return res.status(500).send(error)
  }
}



exports.deleteSubcategory = async (req, res) => {

  try{

    const result = await Subcategory.findByIdAndDelete({_id: req.params.id})
    return res.status(201).json({message: 'Subcategory deleted successfully', data: result})

  }catch (error) {
    return res.status(500).send(error)
  }
}

exports.deleteall = async (req, res) => {

  try{
    const result = await Subcategory.deleteMany({})

    return res.status(201).send(result)


  }catch (error) {
    return res.status(500).send(error)
  }
}
// exports.deleteall = async (req, res) => {
//   try {
//     const result = await Category.deleteMany({})
//     if(!result){
//         res.status(400).send("No product found")
//     }
//     res.status(201).send("All products deleted successfully")
// }
// catch (e){
//     res.status(500).send(e)
// }
// };