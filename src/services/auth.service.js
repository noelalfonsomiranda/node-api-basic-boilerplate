const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

module.exports = {
  issue: ({payload, expiration}) => jwt.sign(payload, secret, expiration ? { expiresIn: expiration } : null),
  verify: (token, cb) => jwt.verify(token, secret, {}, cb)
}
