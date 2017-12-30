const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const postTrip = (tripInfo) => {
  return database.raw('INSERT INTO trips (trip_name, owner_id, start_date, end_date, num_nights, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id, trip_name, user_id, num_nights', [tripInfo.tripName, tripInfo.userId, tripInfo.startDate, tripInfo.endDate, tripInfo.numNights, tripInfo.notes, new Date])
  .then((data) => {
    return data.rows[0]
  })
}

module.exports = {postTrip}
