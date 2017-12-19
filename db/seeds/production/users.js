
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE users RESTART IDENTITY CASCADE')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO users (first_name, last_name, cross_street1, cross_street2, email, phone_number, street, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ["John", "Doe", "Jordan Ave", "Broncos Parkway", "john@gmail.com", "303-342-5050", "231 Somewhere Road", "Parker", "CO", 80134, "house", true, 0, 1, false, "This is John's really cool profile.", new Date]
      ),
      knex.raw(
        'INSERT INTO users (first_name, last_name, cross_street1, cross_street2, email, phone_number, street, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ["Jane", "Smith", "N. Pecos St.", "West 88th Ave.", "jane@gmail.com", "303-807-4550", "456 Here Place", "Federal Heights", "CO", 80260, "apt", false, 1, 0, true, "This is Jane's really cool profile.", new Date]
      )
    ])
  })
}
