const express = require("express");
const router = new express.Router()
const Service = require('../Models/Service')
const Auth = require('../middleware/auth')
// const Auth = require('../middleware/Auth')
// const sellerauth = require('../middleware/sellerauth')

// app.post('/', upload.array('multi-files'), (req, res) => {
//   res.redirect('/');
// });

const upload_Subcategory = require('../multer')
// const{upload_Video}= require('../multer')
const {addMachine,
getMachine,
getbyid,
 subcategorymachine,
 addService,
 getService,
 subcategoryservice,
 deletebyid,
 deleteall,
 editServices,
 addServiceByAdmin} = require('../controller/servicecntrl')

  

router.post('/add', Auth.Auth,  upload_Subcategory.upload_Subcategory.array('service_images', 10),addService)
router.post('/addByadmin', upload_Subcategory.upload_Subcategory.array('service_images', 10),addServiceByAdmin)
router.get("/get/service", getService);
router.get('/get/:id',  getbyid)
router.patch('/:id', editServices)

//T0 GET PRODUCTS BY ID

router.get('/getbysubcat/:id', subcategoryservice)

router.delete('/deletebyid/:id',deletebyid)
router.delete('/deleteall' ,deleteall)

// // to get recomended for you
// router.get('/getrandom', getrandom)
// router.post('/search', searchProduct)



module.exports = router