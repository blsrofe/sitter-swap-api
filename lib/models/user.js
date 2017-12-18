const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchSingle = (id) => {
  return database.raw("SELECT * FROM users WHERE id=?", [id])
  .then((data) => {
    return data.rows[0]
  })
}

module.exports = {fetchSingle}
