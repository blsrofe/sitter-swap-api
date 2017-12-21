var assert = require('chai').assert
var app = require('../server')
var request = require('request')
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', () => {
  before((done) => {
    this.port = 9876
    this.server = app.listen(this.port, (err, result) => {
      if(err) { return done(err) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })

  after(() => {
    this.server.close()
  })

  it('should exist', () => {
    assert(app)
  })

  describe('GET /', () => {
   it('should return a 200', (done) => {
     this.request.get('/', (error, response) => {
       if (error) { done(error) }
       assert.equal(response.statusCode, 200)
       done()
     })
   })

   it('should have a body with the name of the application', (done) => {
     this.request.get('/', (error, response) => {
       if (error) { done(error) }
       assert.include(response.body, 'API for SitterSwap')
       done()
     })
   })
 })

 describe('GET /api/v1/users/:id', () => {
   beforeEach((done) => {
     database.raw(
       'INSERT INTO users (username, password_digest, first_name, last_name, cross_street1, cross_street2, email, phone_number, street, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
       ["jdoe", "password", "John", "Doe", "Jordan Ave", "Broncos Parkway", "john@gmail.com", "303-342-5050", "231 Somewhere Road", "Parker", "CO", 80134, "house", true, 0, 1, false, "This is John's really cool profile.", new Date])
     .then(() => { done() })
   })

   afterEach((done) => {
     database.raw('TRUNCATE users RESTART IDENTITY CASCADE')
     .then(() => { done() })
   })

   it('should return 404 if resource is not found', (done) => {
     this.request.get('/api/v1/users/10000', (error, response) => {
       if (error) { done(error) }
       assert.equal(response.statusCode, 404)
       done()
     })
   })

   it('should return the id and user information for user', (done) => {
     this.request.get('/api/v1/users/1', (error, response) => {
       if (error) { done(error) }

       const id = 1
       const first_name = "John"
       const last_name = "Doe"
       const cross_street1 = "Jordan Ave"
       const cross_street2 = "Broncos Parkway"
       const email = "john@gmail.com"
       const phone_number = "303-342-5050"
       const street = "231 Somewhere Road"
       const city = "Parker"
       const state = "CO"
       const zip = "80134"
       const residence_type = "house"
       const fenced_yard = "true"
       const children_under_two = 0
       const other_children = 1
       const cats = "false"
       const profile = "This is John's really cool profile."

       let parsedUser = JSON.parse(response.body)

       assert.equal(parsedUser.id, id)
       assert.equal(parsedUser.first_name, first_name)
       assert.equal(parsedUser.last_name, last_name)
       assert.equal(parsedUser.cross_street1, cross_street1)
       assert.equal(parsedUser.cross_street2, cross_street2)
       assert.equal(parsedUser.email, email)
       assert.equal(parsedUser.phone_number, phone_number)
       assert.equal(parsedUser.street, street)
       assert.equal(parsedUser.city, city)
       assert.equal(parsedUser.state, state)
       assert.equal(parsedUser.zip, zip)
       assert.equal(parsedUser.residence_type, residence_type)
       assert.equal(parsedUser.fenced_yard, fenced_yard)
       assert.equal(parsedUser.children_under_two, children_under_two)
       assert.equal(parsedUser.other_children, other_children)
       assert.equal(parsedUser.cats, cats)
       assert.equal(parsedUser.profile, profile)
       assert.ok(parsedUser.created_at)
       done()
     })
   })
  })
  describe('GET /api/v1/users/:id/dogs', () => {
    beforeEach((done) => {
      database.raw(
        'INSERT INTO users (first_name, last_name, cross_street1, cross_street2, email, phone_number, street, city, state, zip, residence_type, fenced_yard, children_under_two, other_children, cats, profile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ["John", "Doe", "Jordan Ave", "Broncos Parkway", "john@gmail.com", "303-342-5050", "231 Somewhere Road", "Parker", "CO", 80134, "house", true, 0, 1, false, "This is John's really cool profile.", new Date])
      .then(() => { done() })
    })

    afterEach((done) => {
      database.raw('TRUNCATE users RESTART IDENTITY CASCADE')
      .then(() => { done() })
    })

    it('should return 404 if resource is not found', (done) => {
      this.request.get('/api/v1/users/10000/dogs', (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should return an object for each dog', (done) => {
      this.request.get('/api/v1/users/1/dogs', (error, response) => {
        if (error) { done(error) }

        const dog1 = {}
        const dog2 = {}

        let parsedDogs = JSON.parse(response.body)

        assert.equal(parsedUser.id, id)
        assert.ok(parsedUser.created_at)
        done()
      })
    })
   })
 })
