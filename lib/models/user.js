const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const fetchSingle = (id) => {
  return database.raw("SELECT * FROM users WHERE id=?", [id])
  .then((data) => {
    return data.rows[0]
  })
}

const getCurrent = (id) => {
  return database.raw("SELECT * FROM trips WHERE user_id=? AND status=?", [id, "active"])
  .then((data) => {
    return data.rows
  })
}

const getAccepted = (id) => {
  return database.raw("SELECT trips.id, trips.trip_name, trips.start_date, trips.end_date, trips.num_nights, trips.notes, trips.status, trips.accepter_id, trips.user_id, trips.created_at, users.paws FROM trips INNER JOIN users ON users.id=trips.accepter_id WHERE trips.user_id=? AND trips.status=?", [id, "accepted"])
  .then((data) => {
    return data.rows
  })
}

const getCompleted = (id) => {
  return database.raw("SELECT trips.id, trips.trip_name, trips.start_date, trips.end_date, trips.num_nights, trips.notes, trips.status, trips.accepter_id, trips.user_id, trips.created_at, users.paws FROM trips INNER JOIN users ON users.id=trips.accepter_id WHERE trips.user_id=? AND trips.status=?", [id, "completed"])
  .then((data) => {
    return data.rows
  })
}

const updatePaws = (info, id) => {
  return database.raw('UPDATE users SET paws =? WHERE id=? RETURNING paws, id', [info.paws, id])
  .then((data) => {
    return data.rows[0]
  })
}

const getPublic = (id) => {
  return database.raw("SELECT first_name, cross_street1, cross_street2, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile FROM users WHERE id=?", [id])
  .then((data) => {
    return data.rows
  })
}


const postUser = (userInfo) => {
  return database.raw('INSERT INTO users (first_name, last_name, cross_street1, cross_street2, email, phone_number, street, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile, paws, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id, first_name, last_name',
  [userInfo.firstName, userInfo.lastName, userInfo.crossStreet1, userInfo.crossStreet2, userInfo.email, userInfo.phoneNumber, userInfo.street, userInfo.city, userInfo.state, userInfo.zip, userInfo.residenceType, userInfo.fencedYard, userInfo.childrenUnderTwo, userInfo.otherChildren, userInfo.cats, userInfo.profile, "3", new Date])
  .then((data) => {
    return data.rows[0]
  })
}

const hasAccount = (email) => {
  return database.raw("SELECT id, paws FROM users WHERE email = ?", [email])
    .then((data) => {
      return data.rows[0]
    })
}


module.exports = {fetchSingle, postUser, getCurrent, getPublic, hasAccount, getAccepted, getCompleted, updatePaws}
