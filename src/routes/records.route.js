const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const userController = require('../controllers/users.controller');


router.get('/', userController.getUsersList);

router.get('/:id', userController.getUserByID);

router.post('/', userController.createNewUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('/login/:id', userController.login);

module.exports = router;