const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const gradesController = require('../controllers/grades.controller');


router.get('/', gradesController.getGradesList);

router.get('/:id', gradesController.getGradesByID);

router.post('/', gradesController.createNewGrades);

module.exports = router;