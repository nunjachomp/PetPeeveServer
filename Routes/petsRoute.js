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



// router.post('/:id/adopt', auth, async (req, res) => {
//     try{
//     const petId = req.params.id;
//     const userId = req.user.id; 
//     const pet = await database('pets').where('id', petId).first();
//     const user = await database('users').where('id', userId).first();
//     await database('adoptions').insert({ petId: petId, userId: userId });
//     res.status(200).json({ message: 'Pet adopted successfully!' });
//     } catch(err) {}
//     console.log(err)
//     res.status(500).json({ error: 'Failed to adopt pet.' });
//     });



// DELETE
router.delete('/:id', auth, PetsContoller.deletePet);

module.exports = router




  