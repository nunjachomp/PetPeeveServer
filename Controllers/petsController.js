const { getAllPetsModel, addNewPetModel, deletePetModel, getSinglePetByIdModel } = require('../Models/petsModel')

async function getAllPets(req, res) {
  try {
    const allPets = await getAllPetsModel()
    res.send(allPets);
    console.log(allPets)
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

module.exports = { getAllPets, addPet, deletePet, getPet }