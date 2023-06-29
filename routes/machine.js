const express = require("express");
const router = new express.Router()
const Machine = require('../Models/Machine')
const Auth = require('../middleware/auth')
// const Auth = require('../middleware/Auth')
// const sellerauth = require('../middleware/sellerauth')

// app.post('/', upload.array('multi-files'), (req, res) => {
//   res.redirect('/');
// });

const {upload_Machine}= require("../multer");
// const{upload_Video}= require('../multer')
const {addMachine,
getMachine,
getbyid,
 subcategorymachine, editMachine, searchProduct, addMachineByAdmin,deletebyid, trying,deleteall } = require('../controller/machinecntrl')

  

router.post('/add', Auth.Auth,upload_Machine.array('machine_images'),addMachine);
router.post('/addByAdmin', upload_Machine.array('machine_images'), addMachineByAdmin)
router.get("/get/machine", getMachine);
router.get('/get/:id',  getbyid)
router.get('/getbyuser',Auth.Auth ,  trying)


//T0 GET PRODUCTS BY ID

router.get('/getbysubcat/:id', subcategorymachine)
router.patch('/edit/machine/:id', editMachine)
router.post('/search', searchProduct)

 router.delete('/deletebyid/:id', deletebyid)
 router.delete('/deleteall',deleteall)

// // to get recomended for you
// router.get('/getrandom', getrandom)
// router.post('/search', searchProduct)



module.exports = router