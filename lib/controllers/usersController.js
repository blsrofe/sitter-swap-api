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
}

const postUser = (request, response, next) => {
  let userInfo = request.body.userInfo
  User.postUser(userInfo)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

module.exports = {getUser, postUser}
