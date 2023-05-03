const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const hoursController = require('../controllers/hours.controller');


router.get('/', hoursController.getHoursList);

router.get('/:id', hoursController.getHoursByID);

router.post('/', hoursController.createNewGrades);

module.exports = router;