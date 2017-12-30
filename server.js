const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const UsersController = require('./lib/controllers/usersController')
const DogsController = require('./lib/controllers/dogsController')
const TripsController = require('./lib/controllers/tripsController')

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

app.get('/', (request, response) => {
  response.send('API for SitterSwap')
})

app.get('/api/v1/users/:id', UsersController.getUser)
app.post('/api/v1/dogs', DogsController.postDog)//Unhandled rejection Error: Can't set headers after they are sent.
app.post('/api/v1/users', UsersController.signUp)
app.get('/api/v1/users/:id/dogs', DogsController.getDogs)
app.post('/api/v1/signin', UsersController.signIn)
app.post('/api/v1/trips', TripsController.postTrip)
app.get('/api/v1/trips', TripsController.getActiveTrips)

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`App running on ${app.get('port')}.`)
  })
}

module.exports = app
