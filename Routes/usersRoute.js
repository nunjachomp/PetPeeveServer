const express = require('express');

const router = express.Router();
const UserController = require('../Controllers/usersController')
const {passwordMatch, isNewUser, hashPwd, isExistingUser, auth} = require('../Middleware/usersMiddleware')



// CREATE
router.post('/signup', /*validateBody(signupSchema)*/ passwordMatch, isNewUser, hashPwd, UserController.signup);

router.post('/login', /*validateBody(signupSchema)*/ isExistingUser, UserController.login);

router.get('/user', auth, UserController.sendLoggedInUser)

router.get('/check-status', auth, UserController.checkStatus)


module.exports = router