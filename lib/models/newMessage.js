const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const postMessage = (messageInfo) => {
  return database.raw('INSERT INTO messages (trip_id, message, recipient_id, sender_id, response_to_request, created_at) VALUES (?, ?, ?, ?, ?, ?) RETURNING id', [messageInfo.tripId, messageInfo.message, messageInfo.recipientId, messageInfo.senderId, messageInfo.responseToRequest, new Date])
  .then((data) => {
    return data.rows[0]
  })
}

const getResponses = (id) => {
  return database.raw("SELECT messages.id, messages.message, messages.sender_id, users.first_name FROM messages INNER JOIN users ON messages.sender_id=users.id WHERE messages.trip_id=? AND messages.response_to_request=?", [id, "true"])
  .then((data) => {
    return data.rows
  })
}

const sent = (id) => {
  return database.raw("SELECT messages.id, messages.message, messages.created_at, users.first_name, trips.trip_name FROM messages INNER JOIN users ON messages.recipient_id=users.id INNER JOIN trips ON messages.trip_id=trips.id WHERE messages.sender_id=?", [id])
  .then((data) => {
    return data.rows
  })
}

const received = (id) => {
  return database.raw("SELECT messages.id, messages.message, messages.created_at, users.first_name, trips.trip_name FROM messages INNER JOIN users ON messages.sender_id=users.id INNER JOIN trips ON messages.trip_id=trips.id WHERE messages.recipient_id=?", [id])
  .then((data) => {
    return data.rows
  })
}

module.exports = {postMessage, getResponses, sent, received}
