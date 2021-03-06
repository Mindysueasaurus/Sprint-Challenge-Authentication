const axios = require('axios');
const bcrypt = require('bcryptjs');

const db = require('../database/dbConfig');
const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/border', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(error => json({ message: 'registration failed', error}))
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then( user => {
      if(user && bcrypt.compareSync(creds.password, user.password)){
      const token = generateToken(user);
      res.status(200).json({ token })
    } else {
      res.status(401).json({ message: 'wrong username or password' })
    }
  })
  .catch( error => res.json({ message: 'Login failed', error}))

}

function getJokes(req, res) {
  axios
    .get(
      'https://dog.ceo/api/breed/collie/border/images/random'
      //'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
