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
  return database.raw("SELECT * FROM trips WHERE id=? AND status=?", [id, "active"])
  .then((data) => {
    return data.rows
  })
}

const getPublic = (id) => {
  return database.raw("SELECT username, cross_street1, cross_street2, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile FROM users WHERE id=?", [id])
  .then((data) => {
    return data.rows
  })
}

const logout = (id) => {
  return database.raw("UPDATE users SET token='' WHERE id=? RETURNING id", [id])
  .then((data) => {
    return data.rows
  })
}

const postUser = (userInfo) => {
  return database.raw('INSERT INTO users (username, password_digest, token, first_name, last_name, cross_street1, cross_street2, email, phone_number, street, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id, username, first_name, last_name, token',
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

const findUser = (userReq) => {
  return database.raw("SELECT * FROM users WHERE username = ?", [userReq.username])
    .then((data) => data.rows[0])
}

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
        if (err) {
          reject(err)
        }
        else if (response) {
          resolve(response)
        } else {
          reject(new Error('Passwords do not match.'))
        }
    })
  )
}

const updateUserToken = (token, user) => {
  return database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, username, token", [token, user.id])
    .then((data) => data.rows[0])
}

const authenticate = (token, username) => {
  findByToken(token)
    .then((user) => {
      if (user.username == username) {
        return true
      } else {
        return false
      }
    })
}

const findByToken = (token) => {
  return database.raw("SELECT * FROM users WHERE token = ?", [token])
    .then((data) => {
      if (data.rows[0] !== undefined) {
        data.rows[0]
      } else {
        return {username: ''}
      }
    })
}

module.exports = {fetchSingle, postUser, hashPassword, createToken, findUser, checkPassword, updateUserToken, authenticate, getCurrent, getPublic, logout}
