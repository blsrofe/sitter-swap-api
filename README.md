# Sitter Swap API

This is a capstone project for the Turing School of Software and Design Backend Program. The goal of the project was to learn a new language.

Sitter Swap is tool to bring dog owners together to help reduce the cost of pet sitting and boarding. After creating an account, user can make requests for other users to watch their dogs while they are on vacation. Users can also apply to a request to dog sit for another user. Users have access to a profile page to add information about their dogs and a dashboard to view the status of trip requests and view messages from other users.

This is the frontend for the project. The backend repo can be found at https://github.com/blsrofe/sitter-swap

## Endpoints

* /api/v1/users/:id
* /api/v1/users/:id/requests
* /api/v1/dogs
* /api/v1/users/:id/dogs
* /api/v1/trips
* /api/v1/users-public/:id
* /api/v1/account
* /api/v1/trip-owner/:id
* /api/v1/messages
* /api/v1/responses/:id

### Getting Started
```
git clone git@github.com:blsrofe/sitter-swap-api.git
cd sitter-swap-api
npm install

```

## Deployment

Visit https://sitter-swap-api.herokuapp.com/

The front end site can be found at https://sitterswap.herokuapp.com/

## Built With

* [Node](https://nodejs.org/en/) - Javascript runtime for server side applications
* [Express](https://expressjs.com/) - Node framework
* [Postgresql](https://www.postgresql.org/) - Relational database

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on code of conduct, and the process for submitting pull requests.

## Author

* **Becki Srofe** - [Blsrofe](https://github.com/blsrofe)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
