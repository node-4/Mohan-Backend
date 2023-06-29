




const express = require("express");
const router = new express.Router()
// const Subcategory = require('../models/subcategorymodel')
const ADAuth = require('../middleware/adauth')





const {
  addSubcategory,
  getSubcategory,
  deleteSubcategory,
  editSubcategory,
  getbyid,
  deleteall,
  getsubcategorybycategory
   } = require("../controller/subcategorycntrl");
const {upload_Subcategory}= require("../multer");


router.post("/add/subcategory",addSubcategory);
router.get("/get/subcategory",  getSubcategory);
router.get('/getSubcategory/:id',  getbyid)
router.post("/edit/subcategory/:id" ,editSubcategory);
router.delete('/delete/:id',  deleteSubcategory)
router.delete('/deleteall',  deleteall)
router.get('/getsubcategorybycategory/:id', getsubcategorybycategory)









// // to update the subcategory by its id
// router.patch('/update/:id', ADAuth , async (req, res)=>{
//     const updates = Object.keys(req.body);
//     const allowedUpdates = [ "name", "image"];
//     const isvalidUpdate = updates.every((update) =>
//       allowedUpdates.includes(update)
//     );
//     if (!isvalidUpdate) {
//       res.status(400).send({ Error: "not a valid Update" });
//     }
//     try {
//       const  subcategory = await Subcategory.findOne({
//         _id: req.params.id,
//       });
//       if (!subcategory) {
//         return res.status(404).send(e);
//       }
//       updates.forEach((update) => (subcategory[update] = req.body[update]));
//       await subcategory.save();
//       res.status(201).send(subcategory);
//     } catch (e) {
//       res.status(400).send(e);
//     }
// })


// //to get all the subcategorymodel

// router.get('/get', ADAuth , async (req, res)=>{
//     try {
//     const subcategory = await Subcategory.find({}).populate('owner')
//         res.status(200).send(subcategory)
//     }
//     catch (e){ 
//         res.status(500).send(e)   
//     }
// })


// //to get the subcategory by its _id

// router.get('/get/:id', ADAuth , async (req, res)=>{
//   try {
//   const subcategory = await Subcategory.find({_id : req.params.id}).populate('owner')
//       res.status(200).send(subcategory)
//   }
//   catch (e){ 
//       res.status(500).send(e)   
//   }
// })

// // to delete the subcategory by its id
// router.delete('/delete/:id', ADAuth , async (req, res)=>{
//     const deletesubcategory = await Subcategory.findOneAndDelete({
//         _id: req.params.id,
//         // owner: req.user._id,
//       });
//       try {
//         if (!deletesubcategory) {
//           res.status(404).send("category not found");
//         }
//         res.status(201).send(deletesubcategory);
//       } catch (e) {
//         res.status(500).send(e);
//       }

// })




module.exports = router