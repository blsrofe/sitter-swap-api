const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchAllForUser = (id) => {
  return database.raw("SELECT * FROM dogs WHERE user_id=?", [id])
  .then((data) => {
    return data.rows[0]
  })
}

const postDog = (dogInfo) => {
  return database.raw('INSERT INTO dogs (breed, age, sex, notes, owner_id, created_at) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, name owner_id', [dogInfo.breed, dogInfo.age, dogInfo.sex, dogInfo.notes, dogInfo.owner_id])
  .then((data) => {
    return data.rows[0]
  })
}

module.exports = {fetchAllForUser, postDog}
