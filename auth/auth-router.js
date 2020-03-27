const jwt = require('jsonwebtoken')
const mysecret = require('./secret')
const bcrypt = require('bcryptjs')
const router = require('express').Router();

const Users = require('./auth-model')

router.post('/register', (req, res) => {
  const newUser = req.body
  const { username, password } = newUser
  newUser.password = bcrypt.hashSync(password, 10)

  if (newUser && username && password) {
    Users.add(newUser)
      .then(user => {
        res.status(201).json({ message: `Successfully created new user`, user: user })
      })
      .catch(() => {
        res.status(500).json({ message: `Unable to add new user` })
      })
  } else {
    res.status(401).json({ message: `User must contain username, and password` })
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body

  const generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username
    }
    const secret = mysecret
    const options = {
      expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
  }

  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ message: `Welcome ${user.username}!`, token: token })
      } else {
        res.status(401).json({ message: `Invalid username or password.` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Encountered error` })
    })
});

module.exports = router;
