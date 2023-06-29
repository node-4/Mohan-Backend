const cloudinary = require('cloudinary').v2;

const Machine = require('../Models/Machine')




cloudinary.config({
  cloud_name: "dvwecihog",
  api_key: '364881266278834',
  api_secret: '5_okbyciVx-7qFz7oP31uOpuv7Q'
});

exports.addMachine = async (req, res) => {
  try {
    console.log("Hit MACHINE ")
    let machinePicture = [];
    let machinePictures = [];
    if (req.files.length > 0) {
      machinePicture = req.files.map((file) => {
        return { path: file.path, filename: file.filename };
      });
    }
    console.log(machinePicture)

    const uploadPromises = machinePicture.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.path, { public_id: image.filename });
      return result
    });
    const Images = await Promise.all(uploadPromises);
    for (var i = 0; i < Images.length; i++) {
      machinePictures.push({ img: Images[i].url })
    }


    console.log(machinePictures)
    const newmachine = new Machine({

      // ...req.body,
      User: req.user,

      Machine_name: req.body.Machine_name,
      Condition: req.body.Condition,
      Price: req.body.Price,
      brand: req.body.brand,
      Location: req.body.Location,
      Conatct_number: req.body.Conatct_number,
      Features: req.body.Features,
      About_company: req.body.About_company,
      Additional_info: req.body.Additional_info,
      Description: req.body,
      machinePictures,
      category: req.body.category,
      subcategory: req.body.subcategory,
      // constant_fields:req.body.constant_fields
    })
    newmachine.save((error, data) => {
      console.log(newmachine, data)
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
          error: error
        });
      }
      if (data) {
        return res.status(201).json({
          machine: data
        });
      }
    });
  } catch (err) {
    console.log(err)
  }
}
exports.getMachine = async (req, res) => {
  try {
    const result = await Machine.find({}).populate('subcategory')
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(500).send("No Such machine found")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}


exports.addMachineByAdmin = async (req, res) => {
  try {
    console.log("Hit MACHINE ")
    let machinePicture = [];
    let machinePictures = [];
    if (req.files.length > 0) {
      machinePicture = req.files.map((file) => {
        return { path: file.path, filename: file.filename };
      });
    }
    console.log(machinePicture)

    const uploadPromises = machinePicture.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.path, { public_id: image.filename });
      return result
    });
    const Images = await Promise.all(uploadPromises);
    for (var i = 0; i < Images.length; i++) {
      machinePictures.push({ img: Images[i].url })
    }


    console.log(machinePictures)
    const newmachine = new Machine({


      Machine_name: req.body.Machine_name,
      Condition: req.body.Condition,

      Price: req.body.Price,
      brand: req.body.brand,
      Location: req.body.Location,
      Conatct_number: req.body.Conatct_number,
      Features: req.body.Features,
      About_company: req.body.About_company,
      Additional_info: req.body.Additional_info,
      Description: req.body,
      machinePictures,
      category: req.body.category,
      subcategory: req.body.subcategory,
      // constant_fields:req.body.constant_fields
    })
    console.log(newmachine)
    newmachine.save((error, data) => {
      console.log(newmachine, data)
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
          error: error
        });
      }
      if (data) {
        return res.status(201).json({
          machine: data
        });
      }
    });
  } catch (err) {
    console.log(err)
  }
}
exports.getMachine = async (req, res) => {
  try {
    const result = await Machine.find({})
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(500).send("No Such machine found")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}



exports.trying = async (req, res) => {

  try {

    const mill = await Machine.find({ User: req.user }).populate('User')

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
    const result = await Machine.find({ _id: req.params.id }).populate('User')
    res.status(200).send(result)

  } catch (error) {
    res.status(500).send(error)
  }
}

exports.subcategorymachine = async (req, res) => {
  try {
    const result = await Machine.find({ subcategory: req.params.id }).populate('User')
    console.log(result)
    res.status(200).json({ machines: result })
  }
  catch (e) {
    res.status(500).send(e)
  }
}

exports.editMachine = async (req, res) => {
  // const {Machine_name, Condition, Price,brand, Location, Conatct_number, Features, About_company, Additional_info, Description  } = req.body
  ;
  // const MachineImg = req.file ? req.file.path : null;
  try {
    const id = req.params.id
    const updatedData = {
      Machine_name: req.body.Machine_name,
      Condition: req.body.Condition,
      Price: req.body.Price,
      brand: req.body.brand,
      Location: req.body.Location,
      Conatct_number: req.body.Conatct_number,
      Features: req.body.Features,
      About_company: req.body.About_company,
      Additional_info: req.body.Additional_info,
      Description: req.body,
      // category: req.body.category,
      // subcategory: req.body.subcategory,
    }
    console.log(updatedData)
    await Machine.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
    res.status(201).json({ msg: "Machine updated successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error.message });
  }
};


exports.deletebyid = async (req, res) => {
  try {
    const result = await Machine.deleteOne({ _id: req.params.id })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}



exports.deleteall = async (req, res) => {
  try {
    const result = await Product.deleteMany({})
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}


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



exports.searchProduct = async (req, res, next) => {
  const serachField = req.query.Machinary
  Machine.find({ title: { $regex: serachField, $options: '$i' } }).then(data => {
    res.send(data)
  })
}


