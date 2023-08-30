const dbConnection = require('../knex/knex')

async function getUserByEmailModel(email) {
  try {
    const user = await dbConnection('users').where({ email: email }).first()
    return user
  } catch (err) {
    console.log(err)
  }
}

async function getUserByIdModel(id) {
  try {
    const user = await dbConnection('users').where({ id: id }).first()
    return user
  } catch (err) {
    console.log(err)
  }
}

async function addUserModel(newUser) {
  try {
    
    const [id] = await dbConnection('users').insert(newUser)
    return id
  } catch (err) {
    console.log(err)
  }

}



module.exports = { getUserByEmailModel, addUserModel, getUserByIdModel, getUserByIdModel }



