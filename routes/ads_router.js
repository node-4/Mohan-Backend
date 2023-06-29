const express = require('express');
const Ads_Controllers = require('../controller/ads_controllers');
const verify  = require('../middleware/auth')



const router = express();

router.post('/',verify.Auth, Ads_Controllers.AddAds);
router.get('/user',verify.Auth , Ads_Controllers.getAdsByUserId);
router.put('/update/:id', verify.Auth, Ads_Controllers.EditAds);
router.delete('/delete/:id', verify.Auth, Ads_Controllers.DeleteAds);
router.get('/all', verify.Auth, Ads_Controllers.getAllAds);


module.exports = router;
