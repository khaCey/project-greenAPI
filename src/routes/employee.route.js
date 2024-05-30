const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');

router.get('/', employeeController.getEmployeeListDisplayable);
router.get('/all', employeeController.getEmployeeList);
router.get('/:id', employeeController.getEmployeeByID);
router.post('/', employeeController.createNewEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.post('/login', employeeController.login);

module.exports = router;
