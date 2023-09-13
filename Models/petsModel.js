const dbConnection = require('../knex/knex')

const getAllPetsModel = async () => {
  try {
    const allPets = await dbConnection.from('pets')
    return allPets
  } catch (err) {
    console.log(err)
  }
}

const addNewPetModel = async (newPet) => {
  try {
    const [id] = await dbConnection('pets').insert(newPet)
    newPet.id = id
    return newPet
  } catch (err) {
    console.log(err, "That's an error my friend.")
  }
}

const deletePetModel = async (petId) => {
  try {
    const deletedPet = await dbConnection('pets').where({ id: petId }).del()
    return deletedPet
  } catch (err) {
    console.log(err, "Hmm...what are you trying to do???")
  }
}

const getSinglePetByIdModel = async (petId) => {
  try {
    const pet = await dbConnection("pets").where({ id: petId }).first()
    return pet
  } catch (err) {
    console.log(err)
  }
}

const adoptPetModel = async (petId, userId, isAdopt) => {
  try {
  if (isAdopt) {
  await dbConnection('pets').where({ id: petId }).update({adoptedById: userId, fosteredById: null})
  } else {
  await dbConnection('pets').where({ id: petId }).update({adoptedById: null})
  }
  } catch (err) {
    console.log(err)
  }
}

const fosterPetModel = async (petId, userId, isFostered) => {
  try {
  if (isFostered) {
  await dbConnection('pets').where({ id: petId }).update({fosteredById: userId, adoptedById: null })
  } else {
  await dbConnection('pets').where({ id: petId }).update({fosteredById: null})
  }
  } catch (err) {
    console.log(err)
  }
}


module.exports = { getAllPetsModel, addNewPetModel, deletePetModel, getSinglePetByIdModel, adoptPetModel, fosterPetModel, }