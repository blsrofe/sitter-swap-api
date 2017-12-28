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

const postUser = (userInfo) => {
  return database.raw('INSERT INTO users (username, password_digest, token, first_name, last_name, cross_street1, cross_street2, email, phone_number, street, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id, first_name, last_name, token',
  [userInfo.username, userInfo.password_digest, userInfo.token, userInfo.firstName, userInfo.lastName, userInfo.crossStreet1, userInfo.crossStreet2, userInfo.email, userInfo.phoneNumber, userInfo.street, userInfo.city, userInfo.state, userInfo.zip, userInfo.residenceType, userInfo.fencedYard, userInfo.childrenUnderTwo, userInfo.otherChildren, userInfo.cats, userInfo.profile, new Date])
  .then((data) => {
    return data.rows[0]
  })
}

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
}

const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
}

module.exports = {fetchSingle, postUser, hashPassword, createToken}
