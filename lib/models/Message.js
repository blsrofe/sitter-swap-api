const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const postMessage = (messageInfo) => {
  return database.raw('INSERT INTO messages (trip_id, message, recipient_id, sender_id, response_to_request, created_at) VALUES (?, ?, ?, ?, ?, ?) RETURNING id', [messageInfo.tripId, messageInfo.message, messageInfo.recipientId, messageInfo.senderId, "true", new Date])
  .then((data) => {
    return data.rows[0]
  })
}

module.exports = {postMessage}
