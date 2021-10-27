const express = require('express');
const userController = require('../controllers/user.ctrl');
const middleware = require('../middlewares/auth')

const router = express.Router();

router.get('/', middleware.isAuthorised, userController.getUser);
router.get('/:id', middleware.isAuthorised, userController.getUserById);
router.post('/', middleware.isAuthorised, userController.saveUser);
router.put('/:id', middleware.isAuthorised, userController.updateUser);
router.delete('/:id', middleware.isAuthorised, userController.deleteUser);

module.exports = router;
