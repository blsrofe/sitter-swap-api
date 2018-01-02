const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchAllForUser = (id) => {
  return database.raw("SELECT * FROM dogs WHERE owner_id=?", [id])
  .then((data) => {
    return data.rows
  })
}

const postDog = (dogInfo) => {
  return database.raw('INSERT INTO dogs (name, breed, age, sex, notes, owner_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id, name, owner_id', [dogInfo.name, dogInfo.breed, dogInfo.age, dogInfo.sex, dogInfo.notes, dogInfo.owner_id, new Date])
  .then((data) => {
    return data.rows[0]
  })
}

const deleteDog = (id) => {
  return database.raw('DELETE FROM dogs WHERE id=? RETURNING ?', [id, "dog deleted"])
  .then((data) => {
    return data.rows[0]
  })
}

module.exports = {fetchAllForUser, postDog, deleteDog}
