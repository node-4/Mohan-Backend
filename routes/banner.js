const express = require('express')
const ADAuth = require('../middleware/adauth')
const { addBanner, getBanner, getbyid, editBanner, deleteBanner, deleteallban, banner , deletebannerbyname} = require('../controller/bannercntrl')

// const{addCategory} = require('../controller/categorycntrl')
const router = new express.Router()


const{upload_Banner} = require('../multer')

// console.log(getCategory)
// console.log(addCategory)


router.post('/add/banner' , addBanner)

router.get('/get/banner', getBanner)
// // router.get('/getone/:id', getbyid)
// router.post('/edit/banner/:id', ADAuth, upload_Banner.single('myBanner'), editBanner)
router.delete('/delete/banner/:id', deleteBanner)
router.delete('/deleteall', deleteallban)
router.get('/getbyquery', banner)
router.delete('/deletebannerbyname',deletebannerbyname)

module.exports = router

