const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const Dog = require('../models/dog')

const getDogs = (request, response, next) => {
  let id = request.params.id
  Dog.fetchAllForUser(id)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

const postDog = (request, response, next) => {
  let dogInfo = request.body.dogData
  Dog.postDog(dogInfo)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)//maybe need return here to fix header issue
  })
}

const deleteDog = (request, response, next) => {
  let id = request.body.id
  Dog.deleteDog(id)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)//maybe need return here to fix header issue
  })
}

module.exports = {getDogs, postDog, deleteDog}
