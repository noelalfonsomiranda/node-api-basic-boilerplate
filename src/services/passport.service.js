
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models').User
const cfg = require('../../config/config')
const opts = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: cfg.jwtSecret
}

// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

module.exports = () => {
  const strategy = new JwtStrategy(opts, (jwtPayload, done) => {
    User.findByPk(jwtPayload.id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null))
  })

  passport.use(strategy)

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', {session: false}),
    restrict: (req, res, next) => {
      if (req.user.role === 'admin' || req.user.role === 'super_admin') {
        return next()
      }

      throw 'Unauthorized, strictly for admin users only.'
    }
  }
}
