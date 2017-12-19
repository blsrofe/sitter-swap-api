
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE user_dogs RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO user_dogs (user_id, dog_id, created_at) VALUES (?, ?, ?)',
        [1, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO user_dogs (user_id, dog_id, created_at) VALUES (?, ?, ?)',
        [1, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO user_dogs (user_id, dog_id, created_at) VALUES (?, ?, ?)',
        [2, 3, new Date]
      )
    ])
  })
}
