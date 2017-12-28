const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const User = require('../models/user')

const getUser = (request, response, next) => {
  let id = request.params.id
  User.fetchSingle(id)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
  .catch((err) => console.error(err))
}

const signUp = (request, response, next) => {
  let userInfo = request.body.userData
  User.hashPassword(userInfo.password)
    .then((hashedPassword) => {
      delete userInfo.password
      userInfo.password_digest = hashedPassword
    })
    .then(() => User.createToken())
    .then(token => userInfo.token = token)
    .then(() => User.postUser(userInfo))
    .then((data) => {
      if (!data) { return response.sendStatus(404) }
      response.status(201).json(data)
    })
    .catch((err) => console.error(err))
}

const signIn = (request, response, next) => {
  let userInfo = request.body.userData
  let user

  User.findUser(userInfo)
    .then(foundUser => {
      user = foundUser
      return User.checkPassword(userInfo.password, foundUser)
    })
    .then((res) => User.createToken())
    .then(token => User.updateUserToken(token, user))
    .then(() => {
      delete user.password_digest
      response.status(200).json(user)
    })
    .catch((err) => console.error(err))
}

module.exports = {getUser, signUp, signIn}
