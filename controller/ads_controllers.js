const Ads = require('../Models/Ad')


exports.AddAds = async(req,res) => {
    try{
    const data = {
        iamge: req.body.image,
        user: req.user._id,
        price: req.body.price, 
        name: req.body.name, 
        desc: [{
            speed: req.body.speed,
            width: req.body.width, 
            capacity: req.body.capacity,
            modelName: req.body.modelName,
            brand: req.body.brand,
            modelNo: req.body.modelNo
        }],
        features: req.body.features,
        company: req.body.company,
        info: req.body.info
    }
    const Data = await Ads.create(data);
    res.status(200).json({
        message: Data
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getAdsByUserId = async(req,res) => {
    try{
    const data = await Ads.find({user: req.user._id});
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

exports.DeleteAds = async(req,res) => {
    try{
        await Ads.findByIdAndRemove({
            _id: req.params.id
          });
    res.status(200).json({
        message: "Deleted "
    })
    }catch(err){
        console.log(err);
        res.status(200).json({
            message: err.message
        })
    }
}

exports.EditAds = async(req,res) => {
    try{
    await Ads.findByIdAndUpdate({_id: req.params.id},{
        iamge: req.body.image,
        price: req.body.price, 
        name: req.body.name, 
        desc: [{
            speed: req.body.speed,
            width: req.body.width, 
            capacity: req.body.capacity,
            modelName: req.body.modelName,
            brand: req.body.brand,
            modelNo: req.body.modelNo
        }],
        features: req.body.features,
        company: req.body.company,
        info: req.body.info
    })
    res.status(200).json({
        message: "Updated "
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getAllAds = async(req,res) => {
    try{
    const data = await Ads.find();
    res.status(200).json({
        message: data
    })
    }catch(err){
        console.log(err);
        res.status(400).json({

        })
    }
}