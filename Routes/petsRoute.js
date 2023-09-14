const express = require('express')
const router = express.Router()
const PetsContoller = require('../Controllers/petsController')
const { auth } = require('../Middleware/usersMiddleware')
const { upload } = require('../Middleware/imagesMiddleware')


router.get('/:id',  PetsContoller.getPet);

router.get('/', auth, PetsContoller.getAllPets);

router.post('/', upload.single('petImage'), auth, PetsContoller.addPet);

router.put('/:id/adopt', auth, PetsContoller.adoptPetByUserID);

router.put('/:id/foster', auth, PetsContoller.fosterPetByUserID);

router.delete('/:id', auth, PetsContoller.deletePet);


module.exports = router




  