
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    token TEXT,
    first_name TEXT,
    last_name TEXT,
    cross_street1 TEXT,
    cross_street2 TEXT,
    email TEXT,
    phone_number TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    residence_type TEXT,
    fenced_yard TEXT,
    children_under_two TEXT,
    other_children TEXT,
    cats TEXT,
    profile TEXT,
    created_at TIMESTAMP
  )`
  return knex.raw(createQuery)
}

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE users`
  return knex.raw(dropQuery)
}
