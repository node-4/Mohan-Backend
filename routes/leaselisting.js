const express = require("express");
const router = new express.Router()
const Service = require('../Models/Leaselisting')
const Auth = require('../middleware/auth')
// const Auth = require('../middleware/Auth')
// const sellerauth = require('../middleware/sellerauth')

// app.post('/', upload.array('multi-files'), (req, res) => {
//   res.redirect('/');
// });

const upload_Subcategory = require("../multer");
// const{upload_Video}= require('../multer')
// const {addMachine,
// getMachine,
// getbyid,
//  subcategorymachine,
//  addService,
//  getService,
//  subcategoryservice} = require('../controller/servicecntrl');
const { addLeaselisting, getbyid, getLeaselisting, subcategoryleaselisting, categoryleaselisting, addLeaselistingByadmin, deletebyid, Editleaselisting } = require("../controller/leaselistingcntrl");

  

router.post('/add', Auth.Auth,upload_Subcategory.upload_Subcategory.array('leaselisting_images', 10),addLeaselisting);
//router.post('/addbyadmin', upload_Leaselisting.array('leaselisting_images', 10), addLeaselistingByadmin)
router.get("/get/leaselisting", getLeaselisting);
router.get('/get/:id',  getbyid)
router.patch('/:id', Editleaselisting)

//T0 GET PRODUCTS BY ID

router.get('/getbysubcat/:id', subcategoryleaselisting)
router.get('/getbycat/:id', categoryleaselisting)

router.delete('/deletebyid/:id', deletebyid)
// router.delete('/deleteall',ADAuth, deleteall)

// // to get recomended for you
// router.get('/getrandom', getrandom)
// router.post('/search', searchProduct)



module.exports = router