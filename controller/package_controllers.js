const package = require('../Models/package_model');



exports.AddPackege = async(req,res) => {
    try{
    const data = {
        price: parseInt(req.body.price),
        valid: req.body.valid,
        desc: req.body.desc, 
        image: req.body.image
    }
    const Data = await package.create(data);
    res.status(200).json({
        message: "Package is Added ",
        data : Data
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.GetAllPackage = async(req,res) => {
    try{
    const data = await package.find();
    res.status(200).json({
        message: data
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.DeletePackage = async(req,res) => {
    try{
    await package.deleteOne({_id: req.params.id});
    res.status(200).json({
        message: "Package is Deleted "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.editPackage = async(req,res) => {
    try{
    await package.updateOne({_id: req.params.id}, {
        price: req.body.price,
        valid: req.body.valid,
        desc: req.body.desc, 
        image: req.body.image
    });
    res.status(200).json({
        message: "Package is Updated "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}