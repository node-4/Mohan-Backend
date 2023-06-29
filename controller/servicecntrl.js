const cloudinary = require('cloudinary').v2;
const Service = require('../Models/Service')

cloudinary.config({
  cloud_name: "dvwecihog",
  api_key: '364881266278834',
  api_secret: '5_okbyciVx-7qFz7oP31uOpuv7Q'
});


exports.addService = async (req, res) => {
  try{
  let servicePicture = [];
  let servicePictures = [];

  if (req.files.length > 0) {
    servicePicture = req.files.map((file) => {
      return { img: file.path, filename: file.filename };
    });
  }
  console.log(servicePicture)
  const uploadPromises = servicePicture.map(async (image) => {
    console.log(image)
    const result = await cloudinary.uploader.upload(image.img, {public_id: image.filename});
    return result
  });
  //console.log(result)
 const Images =  await Promise.all(uploadPromises);
 console.log(Images)
 for(var i=0 ; i<Images.length; i++){
  servicePictures.push({img: Images[i].url})
 }



  const newservice = new Service({

    // ...req.body,
    User: req.user,

    Service_name: req.body.Service_name,
    Service_Price:req.body.Service_Price,
      Location: req.body.Location,
      Conatct_number: req.body. Conatct_number,
      About_service: req.body.About_service,
     
      

    

      servicePictures,
    //   // video,
    //   // seller: req.params.id,
    //   // subcategory: req.body.subcategory,
      category: req.body.category,
      subcategory: req.body.subcategory,
      // constant_fields:req.body.constant_fields
  })
  newservice.save((error, data) => {
      console.log(newservice,data)
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
          error:error
        });
      }
      if (data) {
        return res.status(201).json({
          service:data
        });
      }
    });
  }catch(err){
    console.log(err);
    res.status(400).json({
      message: "error", 
      error: err
    })
  }
}


  exports.
  addServiceByAdmin = async (req, res) => {
  
    let servicePicture = [];
    let servicePictures = [];
  
  
    if (req.files.length > 0) {
      servicePicture = req.files.map((file) => {
        console.log(file.filename)
        return { path: file.path, filename: file.filename  };
      });
    }
    const uploadPromises = servicePicture.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.path, {public_id: image.filename});
      return result
    });

   const Images =  await Promise.all(uploadPromises)
   console.log(Images)
   for(var i=0 ; i<Images.length; i++){
    servicePictures.push({img: Images[i].url})
   }
  
  
  
    const newservice = new Service({
  
      // ...req.body,
      // User: req.user,
  
      // Service_name: req.body.Service_name,
      // Service_Price:req.body.Service_Price,
      //   Location: req.body.Location,
      //   Conatct_number: req.body. Conatct_number,
      //   About_service: req.body.About_service,
      //   servicePictures,
      // //   // video,
      // //   // seller: req.params.id,
      // //   // subcategory: req.body.subcategory,
      //   category: req.body.category,
      //   subcategory: req.body.subcategory,
      //   // constant_fields:req.body.constant_fields
    })
    newservice.save((error, data) => {
        console.log(newservice,data)
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
            error:error
          });
        }
        if (data) {
          return res.status(201).json({
            service:data
          });
        }
      });
    }
  exports.getService = async (req, res) => {
try{
    const result = await Service.find({})
if(result){
    res.status(200).send(result)
} else{
   res.status(500).send("No Such service found")
}
}catch (error) {
    res.status(500).send(error)
}
  }



  exports.getbyid = async (req, res) => {
    try{
        const result  = await Service.find({_id : req.params.id})
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).send(error)
    }
  }

  exports.subcategoryservice = async(req,res) => {
    try{
      const result = await Service.find({subcategory:req.params.id})
      console.log(result)
      res.status(200).json({services: result})
    }
    catch(e){
      res.status(500).send(e)
    }
  }


  exports.deletebyid = async (req, res) => {
    try{
        const result = await Service.deleteOne({_id: req.params.id})
        res.status(200).send("Deleted")
    }catch (error) {
        res.status(500).send(error)
    }
  }



  exports.deleteall = async (req, res) => {
    try{
        const result = await Product.deleteMany({})
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
  }
  exports.editServices = async (req, res) => {
    try {
      const id = req.params.id
      const updatedData = {
        Service_name: req.body.Service_name,
      Service_Price:req.body.Service_Price,
        Location: req.body.Location,
        Conatct_number: req.body. Conatct_number,
        About_service: req.body.About_service,
        category: req.body.category,
        subcategory: req.body.subcategory,
      }
      console.log(updatedData)
      await Service.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
      res.status(201).json({ msg: "Service updated successfully" });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ msg: error.message });
    }
  };

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


