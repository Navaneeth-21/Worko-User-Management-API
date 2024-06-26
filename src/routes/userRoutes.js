const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/userMiddleware');

router.get('/worko/user' , authenticate , userController.listallUsers);
router.get('/worko/user/:userID' , authenticate , userController.getUserDetails);
router.post('/worko/user' , authenticate , userController.createUser);
router.put('/worko/user/:userID' , authenticate , userController.updateUser);
router.patch('/worko/user/:userID' , authenticate , userController.updateUser);
router.delete('/worko/user/:userID' , authenticate , userController.deleteUser);

module.exports = router;
