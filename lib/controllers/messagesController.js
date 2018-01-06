const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const Message = require('../models/message')

const postMessage = (request, response, next) => {
  let messageInfo = request.body.messageData
  Message.postMessage(messageInfo)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

module.exports = {postMessage}
