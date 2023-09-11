const { getAllPetsModel, addNewPetModel, deletePetModel, getSinglePetByIdModel, adoptPetModel, fosterPetModel } = require('../Models/petsModel')

async function getAllPets(req, res) {
  try {
    const allPets = await getAllPetsModel()
    res.send(allPets);
  } catch (err) {
    console.log(err)
    res.status(500).send("Something went wrong")
  }
}

async function addPet(req, res) {
  try {
    req.body.petImage = req.file.path
    const newPet = await addNewPetModel(req.body)
    res.send(newPet)
  } catch (err) {
    console.log(err)
    res.status(500).send("Something went wrong")
  }
}

async function deletePet(req, res) {
  try {
    const petToDelete = req.params.id
    const isDeleted = await deletePetModel(petToDelete)
    if (isDeleted) {
      res.send({ ok: true })
    } else {
      res.send({ ok: false })
    }

  } catch (err) {
    console.log(err)
    res.status(500).send("Something went wrong")
  }
}

async function getPet(req, res) {
  try {
    const { id } = req.params
    const pet = await getSinglePetByIdModel(id)
    res.send(pet)
  } catch (err) {
    console.log(err)
    res.status(500).send("Something went wrong")

  }
}

async function adoptPetByUserID(req, res) {
  try {
    const isAdopt = req.body.adopt
    const petId = req.params.id;
    const userId = req.body.userId; 
    await adoptPetModel(petId, userId, isAdopt)

  }catch(err){
    console.log(err)
  }
}

async function fosterPetByUserID(req, res) {
  try {
    const isFostered = req.body.foster
    const petId = req.params.id;
    const userId = req.body.userId; 
    await fosterPetModel(petId, userId, isFostered)

  }catch(err){
    console.log(err)
  }
}


module.exports = { getAllPets, addPet, deletePet, getPet, adoptPetByUserID, fosterPetByUserID }