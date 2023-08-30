const express = require('express')
const router = express.Router()
const PetsContoller = require('../Controllers/petsController')
const { auth } = require('../Middleware/usersMiddleware')
const { upload } = require('../Middleware/imagesMiddleware')

// READ
router.get('/:id',  PetsContoller.getPet)

router.get('/', auth, PetsContoller.getAllPets);

// CREATE
router.post('/', upload.single('petImage'), auth, PetsContoller.addPet);

// DELETE
router.delete('/:id', auth, PetsContoller.deletePet);

module.exports = router