const express = require('express'); 
const terms = require('../controller/termsCntrl');


const router = express();


router.post('/', [  terms.addterms]);
router.get('/', [  terms.getterms]);
router.put('/:id',[ terms.updateterms]);
router.delete('/:id',[  terms.DeleteTerms]);

module.exports = router;