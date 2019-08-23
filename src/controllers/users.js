const User = require('../models').User
const { hash, comparePassword } = require('../services/bcrypt.service')
const authService = require('../services/auth.service')

module.exports = {
  create (req, res, next) {
    let encryptPassword = hash(req.body.password)

    if (req.body.password) {
      return User
        .create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: encryptPassword
        })
        .then(user => {
          const token = authService.issue({id: user.id})

          res.status(201).json({token, user})
        })
        .catch(error => next(error))
    }

    return res.status(400).json({message: 'There\'s something wrong in password.'})
  },
  list (req, res) {
    return User
      .all()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json(error))
  },
  retrieve (req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: 'User Not Found'
          })
        }
        return res.status(200).json(user)
      })
      .catch(error => res.status(400).json(error))
  },
  update (req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: 'User Not Found'
          })
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            email: req.body.email || user.email,
            password: req.body.password || user.password
          })
          .then(() => res.status(200).json(user))
          .catch((error) => res.status(400).json(error))
      })
      .catch((error) => res.status(400).json(error))
  },
  destroy (req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).json({
            message: 'User Not Found'
          })
        }
        return user
          .destroy()
          .then(() => res.status(200).json({ message: 'User deleted successfully.' }))
          .catch(error => res.status(400).json(error))
      })
      .catch(error => res.status(400).json(error))
  },
  login (req, res) {
    const email = req.body.email
    const password = req.body.password
    if (email && password) {
      User.findOne({
        where: {
          email: email
        }
      })
      .then(user => {
        if (!user) {
          return res.status(400).json({message: 'Bad Request: User not found'})
        }
        if (comparePassword(password, user.password)) {
          const token = authService.issue({id: user.id})

          return res.status(200).json({token, user})
        }
        return res.status(401).json({message: 'Unauthorized'})
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({message: 'Internal server error'})
      })
    }
  },
  validate (req, res) {
    const tokenToVerify = req.body.token
    authService
      .verify(tokenToVerify, err => {
        if (err) {
          return res.status(401).json({ isvalid: false, err: 'Invalid Token!' })
        }
        return res.status(200).json({ isvalid: true })
      })
  }
}
