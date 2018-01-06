const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const postTrip = (tripInfo) => {
  return database.raw('INSERT INTO trips (trip_name, user_id, start_date, end_date, num_nights, notes, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id, trip_name, user_id, num_nights', [tripInfo.tripName, tripInfo.userId, tripInfo.startDate, tripInfo.endDate, tripInfo.numNights, tripInfo.notes, "active", new Date])
  .then((data) => {
    return data.rows[0]
  })
}

const getActiveTrips = () => {
  return database.raw("SELECT trips.trip_name, trips.num_nights, trips.notes, trips.start_date, trips.end_date, users.cross_street1, users.cross_street2, users.zip, users.first_name, trips.user_id FROM trips INNER JOIN users ON trips.user_id=users.id WHERE trips.status=?", ["active"])
  .then((data) => {
    return data.rows
  })
}

module.exports = {postTrip, getActiveTrips}
