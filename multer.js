const { Module } = require('module')
var multer = require('multer')
const path = require('path')
//user img upload
var storage1 = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/Userimg')
    },
    filename: function(req,file,cb){
        cb(null, 'User'+'-'+Date.now() + path.extname(file.originalname))
    }
})

//category img upload
var storage2 = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/Category')
    },
    filename: function(req,file,cb){
        cb(null, 'Category'+'-'+Date.now() + path.extname(file.originalname))
    }
})

var storage3 = multer.diskStorage({destination:function(req,file,cb){
    cb(null,'public/Machineimg')
},
filename: function(req,file,cb){
    cb(null, 'Machine'+'-'+Date.now() + path.extname(file.originalname))
}
})



var storage4 = multer.diskStorage({destination:function(req,file,cb){
    cb(null,'public/Admin')
},
filename: function(req,file,cb){
    cb(null, 'Admin'+'-'+Date.now() + path.extname(file.originalname))
}
})


var storage5 = multer.diskStorage({destination:function(req,file,cb){
    cb(null,'public/Bannerimg')
},
filename: function(req,file,cb){
    cb(null, 'Banner'+'-'+Date.now() + path.extname(file.originalname))
}
})

// var storage6 = multer.diskStorage({destination:function(req,file,cb){
//     cb(null, 'public/Video')
// },
// filename: function(req,file,cb){
//     cb(null, 'Video'+'-'+Date.now() + path.extname(file.originalname))
// }
var storage6 = multer.diskStorage({destination:function(req,file,cb){
    console.log(req.file)
    cb(null,'public/Subcategory')
},
filename: function(req,file,cb){
    cb(null, 'Subcategory'+'-'+Date.now() + path.extname(file.originalname))
}
})

var storage7 = multer.diskStorage({destination:function(req,file,cb){
    console.log(req.file)
    cb(null,'public/Serviceimg')
},
filename: function(req,file,cb){
    console.log(file.originalname)
    cb(null, 'Service'+'-'+Date.now() + path.extname(file.originalname))
}
})


var storage8 = multer.diskStorage({destination:function(req,file,cb){
    cb(null,'public/listing')
},
filename: function(req,file,cb){
    cb(null, 'listing'+'-'+Date.now() + path.extname(file.originalname))
}
})



module.exports ={
    upload_user:multer({storage: storage1}),
    upload_Category:multer({storage: storage2}),
    upload_Machine:multer({storage: storage3}),
    upload_Admin:multer({storage: storage4}),
    upload_Banner:multer({storage: storage5}),
    upload_Subcategory:multer({storage: storage6}),
    upload_Service:multer({storage: storage7}),
    upload_Leaselisting:multer({storage: storage8})
}