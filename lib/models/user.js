const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchSingle = (id) => {
  return database.raw("SELECT * FROM users WHERE id=?", [id])
  .then((data) => {
    return data.rows[0]
  })
}

const postUser = (userInfo) => {
  return database.raw('INSERT INTO users (username, password_digest, first_name, last_name, cross_street1, cross_street2, email, phone_number, street, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id, first_name, last_name', 
  [userInfo.username, userInfo.password, userInfo.first_name, userInfo.last_name, userInfo.cross_street1, userInfo.cross_street2, userInfo.email, userInfo.phone_number, userInfo.street, userInfo.city, userInfo.state, userInfo.zip, userInfo.residence_type, userInfo.fenced_yard, userInfo.children_under_two, userInfo.other_children, userInfo.cats, userInfo.profile, new Date]))
  .then((data) => {
    return data.rows[0]
  })
}

module.exports = {fetchSingle, postUser}
