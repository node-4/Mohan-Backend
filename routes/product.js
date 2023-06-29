const express = require("express");
const router = new express.Router()
const Product = require('../Models/Product')
const Auth = require('../middleware/auth')
// const Auth = require('../middleware/Auth')
// const sellerauth = require('../middleware/sellerauth')

// app.post('/', upload.array('multi-files'), (req, res) => {
//   res.redirect('/');
// });

// const {upload_Service}= require("../multer");
// const{upload_Video}= require('../multer')
// const {addMachine,
// getMachine,
// getbyid,
//  subcategorymachine,
//  addService,
// //  getService,
//  subcategoryservice} = require('../controller/servicecntrl');
// const { addJob,getJob, getbyid, subcategoryjob, categoryjob } = require("../controller/jobcntrl");
const { addProduct, getProduct,getbyid, subcategoryproduct, ChangeStatus ,categoryproduct ,DeleteProduct,UpdateProduct,
    trying} = require("../controller/productcntrl");

  

router.post('/add',  addProduct)
router.get("/get/product", getProduct);
router.get('/get/:id',  getbyid)
router.get('/getbyuser',Auth.Auth ,  trying)
router.delete('/delete/:id', DeleteProduct);
router.put('/update/:id', UpdateProduct)
router.post('/status/:id',ChangeStatus )


//T0 GET PRODUCTS BY ID

router.get('/getbysubcat/:id', subcategoryproduct)
router.get('/getbycat/:id', categoryproduct)

// router.delete('/deletebyid/:id',ADAuth, deletebyid)
// router.delete('/deleteall',ADAuth, deleteall)

// // to get recomended for you
// router.get('/getrandom', getrandom)
// router.post('/search', searchProduct)



module.exports = router