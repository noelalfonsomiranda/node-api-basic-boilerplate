const { User } = require('../models')
const { hash, comparePassword } = require('../services/bcrypt.service')
const authService = require('../services/auth.service')
const { issue, verify } = require('../services/auth.service')
const { sendMail } = require('../services/email.service')
const { generateCode } = require('../services/randomString.service')

module.exports = {
  async create (req, res, next) {
    try {
      const {
        firstName,
        lastName,
        email,
        password
      } = req.body

      const userChecker = await User.findOne({
        where: {
          email
        }
      })

      if (userChecker) {
        throw `Email already taken`
      }

      const encryptPassword = hash(password)
      const inviteCode = generateCode()

      if (password) {
        return User
          .create({
            firstName,
            lastName,
            email,
            password: encryptPassword,
            inviteCode
          })
          .then(async () => {
            try {
              const verificationToken = issue({
                payload: {
                  email
                }
              })

              const data = {
                from: 'hello@test.com',
                to: email,
                subject: 'Email Verification',
                text: `
                Here's the link to verify your account.
                ${process.env.APP_BASE_URL}/verify-email?_a=${verificationToken}
                `
              }

              await sendMail(data)

              return res.status(200).json({
                success: true,
                message: 'Successfully registered user'
              })
            } catch (error) {
              return next(error)
            }
          })
          .catch(error => next(error))
      }
    } catch (err) {
      return next(err)
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { email } = verify(req.body.token)

      const user = await User.findOne({
        where: {
          email
        }
      })

      if(user.emailVerified) {
        throw `User already verified`
      }

      user.emailVerified = true

      await user.save()

      return res.status(200).json({
        success: true,
        message: 'Email successfully verified'
      })
    } catch (err) {
      return next(err)
    }
  },

  list (req, res) {
    return User
      .findAll()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json(error))
  },

  retrieve (req, res, next) {
    return User
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          throw `User not found`
        }
        return res.status(200).json({
          success: true,
          message: 'Successfully retrieve one user',
          data: user
        })
      })
      .catch(error => next(error))
  },

  update (req, res) {
    return User
      .findByPk(req.params.userId)
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
      .findByPk(req.params.userId)
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

  async login (req, res, next) {
    try {
      const { email, password } = req.body
      const userObj = await User.findOne({
        where: {
          email,
          emailVerified: true
        },
        raw: true
      })

      if (userObj && comparePassword(password, userObj.password)) {
        const {
          firstName,
          lastName,
          emailVerified,
          role,
          id
        } = userObj

        const payload = {
          firstName,
          lastName,
          emailVerified,
          role,
          id
        }

        const token = issue({
          payload,
          expiration: '12h'
        })

        return res.status(200).json({
          success: true,
          message: 'Successfully login',
          token,
          data: payload
        })
      }

      throw `Invalid Username or Password`
    } catch (error) {
      return next(error)
    }
  },

  validate (req, res, next) {
    try {
      const { token } = req.body
      const verifyToken = verify(token)
      return res.status(200).json({
        success: true,
        message: 'Successfully verified',
        data: verifyToken
      })
    } catch (error) {
      return next(error)
    }
  }
}
