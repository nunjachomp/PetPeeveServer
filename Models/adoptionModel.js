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

  module.exports = { savePetModel, getMySavedPetsByIdModel }