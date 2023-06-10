const express = require('express');
const router = new express.Router();
const controller = require('../controllers/usercontroller');
const createUser = require('../middleware/createuser');
const authMiddleware = require('../middleware/auth');

router.post('/', createUser, controller.addUser);
router.post('/login', controller.loginUser);
router.get('/', authMiddleware, controller.getUsers);
router.post('/update', authMiddleware, controller.updateUser);
router.delete('/delete', authMiddleware, controller.deleteUser);

module.exports = router;