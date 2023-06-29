const Job = require('../Models/Job')




exports.addJob = async (req, res) => {
//   let servicePictures = [];

//   if (req.files.length > 0) {
//     servicePictures = req.files.map((file) => {
//       return { img: file.path };
//     });
//   }



  const newjob = new Job({

    // ...req.body,
    User: req.user,

    Job_name: req.body.Job_name,
    Description:req.body.Description,
      Location: req.body.Location,
      Contact_number: req.body. Contact_number,
      Job_type: req.body.Job_type,
     
      

    


    //   // video,
    //   // seller: req.params.id,
    //   // subcategory: req.body.subcategory,
      jobcategory: req.body.jobcategory,
      subcategory: req.body.subcategory,
      // constant_fields:req.body.constant_fields
  })
  newjob.save((error, data) => {
      console.log(newjob,data)
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
          error:error
        });
      }
      if (data) {
        return res.status(201).json({
          job:data
        });
      }
    });
  }

  exports.getJob = async (req, res) => {
try{
    const result = await Job.find({})
if(result){
    res.status(200).send(result)
} else{
   res.status(500).send("No Such job found")
}
}catch (error) {
    res.status(500).send(error)
}
  }



  exports.getbyid = async (req, res) => {
    try{
        const result  = await Job.find({_id : req.params.id})
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).send(error)
    }
  }

  exports.subcategoryjob = async(req,res) => {
    try{
      const result = await Job.find({subcategory:req.params.id})
      console.log(result)
      res.status(200).json({jobs: result})
    }
    catch(e){
      res.status(500).send(e)
    }
  }



  exports.categoryjob = async(req,res) => {
    try{
      const result = await Job.find({category:req.params.id})
      console.log(result)
      res.status(200).json({jobs: result})
    }
    catch(e){
      res.status(500).send(e)
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


