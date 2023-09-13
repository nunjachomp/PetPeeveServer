const { savePetModel, getMySavedPetsByIdModel } = require('../Models/adoptionModel')

async function savePetByUserID(req, res) {
    try {
      const petId = req.body.petId
      const userId = req.body.userId;
      await savePetModel(userId, petId)
      res.status(200).json({ message: 'Pet saved successfully' });
    }catch(err){
      console.log(err)
      res.status(500).json({ error: 'An error occurred while saving the pet' });
    }
  }

  async function getMySavedPetsByUserId(req, res) {
    try {
      const savedPets = await getMySavedPetsByIdModel();
      res.send(savedPets)
    } catch(err){
      res.status(500).send("Something went wrong")
    }
  }
  

  module.exports = { savePetByUserID, getMySavedPetsByUserId }