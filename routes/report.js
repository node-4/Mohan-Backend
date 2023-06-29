const express = require('express')
const router = new express.Router()
const report = require('../controller/report')





router.post('/add',  report.AddReport)
router.get('/all', report.getReport)
router.get('/get/:id', report.getByID)
router.put('/update/:id',  report.updateReport)
router.delete('/delete/:id', report.DeleteRouter)

module.exports = router