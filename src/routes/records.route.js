const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const recordsController = require('../controllers/records.controller');


router.get('/', recordsController.getRecordsList);

router.get('/:id', recordsController.getRecordByID);

router.post('/', recordsController.createNewRecord);

router.put('/:id', recordsController.updateRecord);

router.delete('/:id', recordsController.deleteRecord);



module.exports = router;