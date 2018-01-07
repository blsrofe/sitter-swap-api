const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const Message = require('../models/newMessage')

const postMessage = (request, response, next) => {
  let messageInfo = request.body.messageData
  console.log(messageInfo)
  Message.postMessage(messageInfo)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

const getResponses = (request, response, next) => {
  let id = request.params.id
  Message.getResponses(id)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

module.exports = {postMessage, getResponses}
