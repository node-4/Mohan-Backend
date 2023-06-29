const express = require('express');
const package = require('../controller/package_controllers');
const router = express();

router.post('/', package.AddPackege);
router.get('/', package.GetAllPackage);
router.put('/update/:id',package.editPackage )
router.delete('/delete/:id', package.DeletePackage)



module.exports = router;