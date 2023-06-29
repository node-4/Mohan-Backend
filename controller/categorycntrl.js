const Category = require('../Models/Category')
// var ObjectId = require('mongodb').ObjectId


exports.addCategory = async(req,res) => {
  try{

    const newCategory = new Category({
        category: req.body.category,
        categoryimg: req.body.image
    })

  await newCategory.save()
  res.status(200).send(newCategory)

    
  }
      catch(error){
        console.log(error)
       res.status(400).json({message:'Something went wrong'})
        }
    
}


exports.getCategory = async(req , res) => {
    try {
        const getCategory = await Category.find({})
        if(getCategory){

            return res.status(200).json({ total: getCategory.length, categories:getCategory,})

        }
        else {

            res.status(400).send("something bad happened")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}

exports.getbyid = async(req,res) => {
    try {
        const getCategory = await Category.find({_id:req.params.id})
        return res.status(200).json(getCategory)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:error.message})
    }
}

exports.editCategory = async (req, res) => {
 
try {
  const updatecat = await Category.findByIdAndUpdate({ 
    _id: req.params.id
    },
    {
     category: req.body.category,
     categoryimg:req.body.image

    }
  );

  const result = await Category.findById({_id: req.params.id})
   res.status(201).json({ msg: "Category updated successfully" ,
data: result});
} catch (error) {
  console.log(error)
   res.status(500).json({ msg: error.message });
}
};


exports.deleteCategory = async (req, res) => {
try {
  const deleteCategory = await Category.findByIdAndRemove({
    _id: req.params.id
  });
  console.log(req.params.id)
  return res.status(200).json({ msg: "Category deleted successfully" ,data:  deleteCategory});
} catch (error) {
  return res.status(500).json({ msg: error.message });
}
};

exports.deleteallcat = async (req, res) => {
try {
  const result = await Category.deleteMany({})
  if(!result){
      res.status(400).send("No product found")
  }
  res.status(201).send("All categories deleted successfully")
}
catch (e){
  res.status(500).send(e)
}
};


