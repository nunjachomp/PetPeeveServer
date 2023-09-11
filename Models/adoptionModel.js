const dbConnection = require('../knex/knex')


const savePetModel = async (userId, petId, isSaved) => {
    try {
      if(isSaved) {
    await dbConnection('adoption').insert({petId: petId, userId: userId})
    }
    } catch (err) {
      console.log(err)
    }
  }

  module.exports = { savePetModel }