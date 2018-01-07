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

const updateTrip = (request, response, next) => {
  let tripInfo = request.body.postInfo
  let id = request.params.id
  Trip.updateTrip(tripInfo, id)
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

const getOwner = (request, response, next) => {
  let id = request.params.id
  Trip.getOwner(id)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}


module.exports = {postTrip, getActiveTrips, getOwner, updateTrip}
