const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
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

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://sitter-swap.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://sitter-swap.com',
    issuer: "https://sitter-swap.auth0.com/",
    algorithms: ['RS256']
})

// app.get('/api/v1/users/:id', authCheck, UsersController.getUser)
app.get('/api/v1/users/:id', UsersController.getUser)
app.get('/api/v1/users/:id/requests', UsersController.getCurrentRequests)
app.post('/api/v1/dogs', DogsController.postDog)
app.post('/api/v1/users', UsersController.signUp)
app.get('/api/v1/users/:id/dogs', DogsController.getDogs)
app.post('/api/v1/signin', UsersController.signIn)
app.post('/api/v1/trips', TripsController.postTrip)
app.get('/api/v1/trips', TripsController.getActiveTrips)
app.get('/api/v1/users-public/:id', UsersController.getPublic)
app.delete('/api/v1/dogs/:id', DogsController.deleteDog)

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`App running on ${app.get('port')}.`)
  })
}

module.exports = app
