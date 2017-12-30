exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE trips(
    id SERIAL PRIMARY KEY NOT NULL,
    trip_name TEXT,
    start_date DATE,
    end_date DATE,
    num_nights INT,
    notes TEXT,
    status TEXT,
    user_id INT REFERENCES users (id) on delete cascade on update cascade,
    created_at TIMESTAMP
  )`
  return knex.raw(createQuery)
}

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE trips`
  return knex.raw(dropQuery)
}
