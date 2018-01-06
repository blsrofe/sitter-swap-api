const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const postMessage = (messageInfo) => {
  return database.raw('INSERT INTO messages (trip_id, message, recipient_id, sender_id, response_to_request, created_at) VALUES (?, ?, ?, ?, ?, ?) RETURNING id', [messageInfo.tripId, messageInfo.message, messageInfo.recipientId, messageInfo.senderId, "true", new Date])
  .then((data) => {
    return data.rows[0]
  })
}

const getResponses = (id) => {
  return database.raw("SELECT messages.message, messages.sender_id, users.first_name FROM messages INNER JOIN users ON messages.sender_id=users.id WHERE messages.trip_id=? AND messages.response_to_request=?", [id, "true"])
  .then((data) => {
    return data.rows
  })
}

module.exports = {postMessage, getResponses}
