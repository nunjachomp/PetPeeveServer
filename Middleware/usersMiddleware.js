const { getUserByEmailModel } = require('../Models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function passwordMatch(req, res, next) {
  if (req.body.password !== req.body.rePassword) {
    return res.status(400).send("Passwords don't match, pal!")
  }
  next()
}

async function isNewUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email)
  if (user) {
    return res.status(400).send('User with this email already exists')
  }
  next()
}

async function isExistingUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email)
  if (user) {
    req.body.user = user
    next()
  } else {
    res.status(400).send('User with this email does not exist')
  }
}

function hashPwd(req, res, next) {
  const saltRounds = 10
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(400).send('Error hashing password')
    } else {
      req.body.password = hash
      next()
    }
  });
}

function auth(req, res, next) {
  const { token } = req.cookies
  if(!token) {
    return res.status(401).send('Token Cookie Required')
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if(err) {
     return res.status(401).send('Invalid token')
    }
    req.body.userId = decoded.id
    next()
  });
}

function checkIfAdmin(req, res, next) {
  const { token } = req.cookies
  console.log(req.cookies) //cookie has isAdmin
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token')
    }
    // if (decoded.isAdmin) {
    //   req.body.isAdmin = decoded.isAdmin
    if (decoded.isAdmin === 1) {
      console.log(decoded) //returns: { id: 1, isAdmin: 1, iat: 1694068554, exp: 1694075754 }
      console.log(decoded.isAdmin) //returns: 1
      next()
    } else {
      res.status(403).send("Bro, you don't have Admin permissions!")
    }
  });
}

module.exports = { passwordMatch, isNewUser, hashPwd, isExistingUser, auth, checkIfAdmin }