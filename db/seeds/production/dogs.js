exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE dogs RESTART IDENTITY CASCADE')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO dogs (breed, age, sex, notes, owner_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ["German Shepard", 8, "M", "This is an awesome dog", 1, new Date]
      ),
      knex.raw(
        'INSERT INTO dogs (breed, age, sex, notes, owner_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ["Springer Spaniel", 9, "F", "This is an awesome dog too", 1, new Date]
      ),
      knex.raw(
        'INSERT INTO dogs (breed, age, sex, notes, owner_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ["Corgi mix", 3, "F", "This is an awesome dog as well", 2, new Date]
      )
    ])
  })
}
