const { addUserModel, getUserByIdModel, toggleAdminModel } = require('../Models/usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function signup(req, res) {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      hashpassword: req.body.password
    }

    const id = await addUserModel(newUser)
    if (id) {
      res.send({ ok: true, id: id });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}


async function login(req, res) {
  const { password, user } = req.body
  try {
    bcrypt.compare(password, user.hashpassword, (err, result) => {
      if (!result) {
        return res.status(401).send('Incorrect password')
      }
      if (err) {
        return res.status(500).send('Error comparing')
      }

      if (result) {
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        res.cookie('token', token, {
          maxAge: 7200000, httpOnly: true, sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        })
        res.send({ ok: true, userId: user.id })
      }
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}

async function sendLoggedInUser(req, res) {
  try {
    const id = req.body.userId
    const user = await getUserByIdModel(id)
    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}

async function checkStatus(req, res) {
  try {
    res.send({ userId: req.body.userId, isAdmin: req.body.isAdmin })
  } catch (err) {
    console.log(err)
  }
}

async function toggleAdmin(req, res) {
  try {
    const { id } = req.body
    const user = await toggleAdminModel(id)
    res.send(user)
  } catch (err) {
    res.send({ affectedUser, err: "Something Went Wrong" })
    console.log(err)
  }
}

module.exports = { signup, login, sendLoggedInUser, checkStatus, toggleAdmin }