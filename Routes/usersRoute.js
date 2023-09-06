const express = require('express');

const router = express.Router();
const UserController = require('../Controllers/usersController')
const {passwordMatch, isNewUser, hashPwd, isExistingUser, auth, checkIfAdmin} = require('../Middleware/usersMiddleware')



// CREATE
router.post('/signup', /*validateBody(signupSchema)*/ passwordMatch, isNewUser, hashPwd, UserController.signup);

router.post('/login', /*validateBody(signupSchema)*/ isExistingUser, UserController.login);

router.get('/user', auth, UserController.sendLoggedInUser)

// router.get('/check-status', auth, UserController.checkStatus)
router.get('/check-status', auth,  checkIfAdmin, UserController.checkStatus)

router.put('/toggleadmin', auth, checkIfAdmin, UserController.toggleAdmin)
// router.put('/toggleadmin', auth, UserController.toggleAdmin)

router.get('/', auth, UserController.getAllUsers)


module.exports = router