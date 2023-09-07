const express = require('express');

const router = express.Router();
const UserController = require('../Controllers/usersController')
const {passwordMatch, isNewUser, hashPwd, isExistingUser, auth, checkIfAdmin} = require('../Middleware/usersMiddleware')



// CREATE
router.post('/signup', /*validateBody(signupSchema)*/ passwordMatch, isNewUser, hashPwd, UserController.signup);

router.post('/login', /*validateBody(signupSchema)*/ isExistingUser, UserController.login);

router.get('/user', auth, UserController.sendLoggedInUser)

router.get('/check-status', auth,  checkIfAdmin, UserController.checkStatus)

router.put('/toggleadmin', auth, checkIfAdmin, UserController.toggleAdmin)

router.get('/', auth, UserController.getAllUsers)

router.get('/user', auth, UserController.getMyPetsByUserId)


module.exports = router