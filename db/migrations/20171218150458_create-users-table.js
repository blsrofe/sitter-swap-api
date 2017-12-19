
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name TEXT,
    last_name TEXT,
    cross_street1 TEXT,
    cross_street2 TEXT,
    email TEXT UNIQUE,
    phone_number TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    zip INT,
    residence_type TEXT,
    fenced_yard BOOLEAN,
    children_under_two INT,
    other_children INT,
    cats BOOLEAN,
    profile TEXT,
    created_at TIMESTAMP
  )`
  return knex.raw(createQuery)
}

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE users`
  return knex.raw(dropQuery)
}
