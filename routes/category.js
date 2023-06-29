const express = require('express')
const ADAuth = require('../middleware/adauth')
const { addCategory, getCategory, getbyid, editCategory, deleteCategory, deleteallcat } = require('../controller/categorycntrl')

// const{addCategory} = require('../controller/categorycntrl')
const router = new express.Router()


const{upload_Category} = require('../multer')




router.post('/add/category',upload_Category.single('image'), addCategory)


router.get('/get/category', getCategory)
router.get('/getone/:id', getbyid)
router.post('/edit/category/:id', editCategory)
router.delete('/delete/category/:id', deleteCategory)
router.delete('/deleteall', deleteallcat)


module.exports = router

