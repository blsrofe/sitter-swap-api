exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE messages(
    id SERIAL PRIMARY KEY NOT NULL,
    trip_id INT REFERENCES trips (id) on delete cascade on update cascade,
    message TEXT,
    recipient_id INT REFERENCES users (id) on delete cascade on update cascade,
    sender_id INT REFERENCES users (id) on delete cascade on update cascade,
    response_to_request TEXT,
    created_at TIMESTAMP
  )`
  return knex.raw(createQuery)
}

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE messages`
  return knex.raw(dropQuery)
}
