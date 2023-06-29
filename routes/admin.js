const express = require('express')
const router = new express.Router()
const ADAuth = require('../middleware/adauth')

// const{upload_Admin} = require('../multer')
const{addAdmin, loginAdmin, getAdmin, getbyid, editAdmin,logoutAdmin, deleteAdmin, logoutAdminAll, filterDate} = require('../controller/admincntrl')



router.post('/add/admin',  addAdmin)
router.post('/login/Admin', loginAdmin)
router.get('/get/Admin', getAdmin)
router.get('/getone/:id', getbyid)
router.get('/filter', filterDate)
router.post('/edit/admin/:id', ADAuth,editAdmin)
router.post('/logout/Admin',ADAuth, logoutAdmin)

router.post('/logoutAll/Admin', ADAuth, logoutAdminAll)
router.delete('/delete/admin/:id', ADAuth, deleteAdmin)
module.exports = router