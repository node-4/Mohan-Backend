const Product = require('../Models/Product');
// const Job = require('../Models/Product')




exports.addProduct = async (req, res) => {
  //   let servicePictures = [];

  //   if (req.files.length > 0) {
  //     servicePictures = req.files.map((file) => {
  //       return { img: file.path };
  //     });
  //   }

  const newproduct = new Product({

    // ...req.body,
    User: req.user,
    image: req.body.image,
    Product_name: req.body.Product_name,
    Description: req.body.Description,
    Location: req.body.Location,
    Contact_number: req.body.Contact_number,
    Product_type: req.body.Product_type,






    //   // video,
    //   // seller: req.params.id,
    //   // subcategory: req.body.subcategory,
    productcategory: req.body.productcategory,
    subcategory: req.body.subcategory,
    // constant_fields:req.body.constant_fields
  })
  newproduct.save((error, data) => {
    console.log(newproduct, data)
    if (error) {
      return res.status(400).json({
        message: "Something went wrong",
        error: error
      });
    }
    if (data) {
      return res.status(201).json({
        product: data
      });
    }
  });
}

exports.getProduct = async (req, res) => {
  try {
    const result = await Product.find({}).populate(['productcategory', 'subcategory'])
    if (result) {
      res.status(200).send({total: result.length, data: result})
    } else {
      res.status(500).send("No Such product found")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

exports.DeleteProduct = async(req,res) => {
  try {
    const deleteBanner = await Product.findByIdAndDelete({
      _id: req.params.id
    });
    console.log(req.params.id)
    return res.status(200).json({ msg: "Product deleted successfully" ,data:  deleteBanner});
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

exports.trying = async (req, res) => {

  try {

    const mill = await Product.find({ User: req.user }).populate('User')

    console.log(mill)

    res.status(200).json({

      result: mill
    })

  } catch (e) {

    res.status(500).json({
      error: e
    })
  }
}


exports.getbyid = async (req, res) => {
  try {
    const result = await Product.findOne({ _id: req.params.id }).populate('User')
    console.log(result)
    res.status(200).send(result)

  } catch (error) {
    res.status(500).send(error)
  }
}

exports.subcategoryproduct = async (req, res) => {
  try {
    const result = await Product.find({ subcategory: req.params.id })
    console.log(result)
    res.status(200).json({ jobs: result })
  }
  catch (e) {
    res.status(500).send(e)
  }
}



exports.categoryproduct = async (req, res) => {
  try {
    const result = await Product.find({ category: req.params.id })
    console.log(result)
    res.status(200).json({ jobs: result })
  }
  catch (e) {
    res.status(500).send(e)
  }
}


exports.UpdateProduct = async(req,res) => {
  try{
 const data =  await Product.findById({_id: req.params.id}, )
    
    data.image =  req.body.image
    data.Product_name = req.body.Product_name
    data.Description = req.body.Description;
    data.Location =  req.body.Location,
    data.Contact_number =  req.body.Contact_number
    data.Product_type = req.body.Product_type
    data.productcategory =  req.body.productcategory
    data.subcategory = req.body.subcategory
    data.save();
  res.status(200).json({ message: "updated Product " })
  }catch(err){
    console.log(err)
    res.status(500).send(err.message)
  }
}
// exports.recentproduct = async (req, res) => {
//   try {

//   } catch (error) {

//   }
// }

exports.ChangeStatus = async(req,res) => {
  try{
  const product = await Product.findById({_id: req.params.id});
  if(product.status === "dissApprove"){
    product.status = "Approve"
    product.save()
    return res.status(200).json({
      message: "Product is Approved "
    })
  }else{
    product.status = "dissApprove"
    product.save()
    return res.status(200).json({
      message: "Product is DisApprove"
    })
  }
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}


//   exports.deletebyid = async (req, res) => {
//     try{
//         const result = await Machine.deleteOne({_id: req.params.id})
//         res.status(200).send(result)
//     }catch (error) {
//         res.status(500).send(error)
//     }
//   }



//   exports.deleteall = async (req, res) => {
//     try{
//         const result = await Product.deleteMany({})
//         res.status(200).send(result)
//     } catch (error) {
//         res.status(500).send(error)
//     }
//   }


//   // db.yourCollection.find().limit(-1).skip(yourRandomNumber).next()
//   exports.getrandom = async(req, res)=>{


//     console.log("qwertyuio")
//     try{

// // to get random product recommended for you
//  const result = await Product.find().skip(1)
//  console.log(result)

//     }catch (e){

//       res.status(500).send(e)
//     }
//   }

//   exports.searchProduct = async(req,res,next) => {
//     const serachField = req.query.title
//     Product.find({title: {$regex: serachField, $options: '$i'}}).then(data => {
//       res.send(data)
//     })
//   }


