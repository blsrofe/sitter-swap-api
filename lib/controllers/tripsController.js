const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const Trip = require('../models/trip')

const postTrip = (request, response, next) => {
  let tripInfo = request.body.tripData
  Trip.postTrip(tripInfo)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

const getActiveTrips = (request, response, next) => {
  Trip.getActiveTrips()
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}


module.exports = {postTrip, getActiveTrips}
