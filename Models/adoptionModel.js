const dbConnection = require('../knex/knex')


const savePetModel = async (userId, petId, name, petImage) => {
    try {   
    await dbConnection('adoption').insert({userId, petId, name, petImage})
    } catch (err) {
      console.log(err)
    }
  }

  async function getMySavedPetsByIdModel() {
    try {
     const savedPets = await dbConnection.from('adoption')
     return savedPets
    } catch (err) {
      console.log(err)
    }
  }

  const deleteSavedPetModel = async (petId) => {
    try {
      const deleteSavedPet = await dbConnection('adoption').where({ id: petId }).del()
      return deleteSavedPet
    } catch (err) {
      console.log(err, "Hmm...what are you trying to do???")
    }
  }

  module.exports = { savePetModel, getMySavedPetsByIdModel, deleteSavedPetModel }