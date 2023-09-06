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

async function toggleAdminModel(id) {
  try {
    const users = await dbConnection('users').where({ id }).select("*")
    if(!users[0]) {throw "No Such User"}
    const user =  users[0]
    const affectedUser = await dbConnection('users').where({ id }).update({isAdmin: user.isAdmin ? 0 : 1})
    const updateduser = await dbConnection('users').where({ id }).select("*")
    console.log(`Successfully toggled admin status for user: ${user.id} `, updateduser)
    return updateduser[0]
  } catch (err) {
    console.log(err)
  }
}

async function getAllUsersModel() {
  try {
    const allUsers = await dbConnection.from('users')
    return allUsers
  } catch (err) {
    console.log(err)
  }
}

module.exports = { getUserByEmailModel, addUserModel, getUserByIdModel, getUserByIdModel, toggleAdminModel, getAllUsersModel }



