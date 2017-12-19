
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE dogs(
    id SERIAL PRIMARY KEY NOT NULL,
    breed TEXT,
    age INT,
    sex TEXT,
    notes TEXT,
    owner_id INT REFERENCES users (id),
    created_at TIMESTAMP
  )`
  return knex.raw(createQuery)
}

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE dogs`
  return knex.raw(dropQuery)
}
