const jwt = require('jsonwebtoken')
const secret = require('./secret')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization) {
    jwt.verify(authorization, secret, (err, token) => {
      if (err) {
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        res.token = token
        next()
      }
    })
  } else {
    res.status(400).json({ you: 'No authorization provided' });
  }
};
