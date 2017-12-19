const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchAllForUser = (id) => {
  return database.raw("SELECT * FROM dogs WHERE user_id=?", [id])
  .then((data) => {
    return data.rows[0]
  })
}

module.exports = {fetchAllForUser}
