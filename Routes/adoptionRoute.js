const express = require('express')
const router = express.Router()
const AdoptionContoller = require('../Controllers/adoptionController')
const { auth } = require('../Middleware/usersMiddleware')



router.post('/:id/save', auth, AdoptionContoller.savePetByUserID);

module.exports = router