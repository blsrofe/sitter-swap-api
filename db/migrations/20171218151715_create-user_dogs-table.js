
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE user_dogs(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users,
    dog_id INT REFERENCES dogs,
    created_at TIMESTAMP
  )`
  return knex.raw(createQuery)
}

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE user_dogs`
  return knex.raw(dropQuery)
}
