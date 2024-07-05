const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/userMiddleware');

router.get('/worko/user'  , userController.listallUsers);
router.get('/worko/user/:userID'  , userController.getUserDetails);
router.post('/worko/user' , userController.createUser);
router.put('/worko/user/:userID'  , userController.updateUser);
router.patch('/worko/user/:userID'   , userController.updateUser);
router.delete('/worko/user/:userID'  , userController.deleteUser);

module.exports = router;
