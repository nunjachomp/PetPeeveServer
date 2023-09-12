const { savePetModel } = require('../Models/adoptionModel')

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

  module.exports = { savePetByUserID }