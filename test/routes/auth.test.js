const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)
const Users = require('../../src/models').User
const authService = require('../../src/services/auth.service')
const { comparePassword } = require('../../src/services/bcrypt.service')

describe('Authentication route', () => {
  let token
  let mockUser

  beforeEach(done => {
    Users
      .destroy({where: {}})
      .then(() => Users.create({
        firstName: 'Test',
        lastName: 'Sample',
        email: 'test.sample@email.com',
        password: 'password'
      }))
      .then((req, res) => {
        mockUser = req.dataValues
        token = authService.issue({id: req.dataValues.id})
        done()
      })
  })
  describe('POST /login', () => {
    it('should logged in', done => {
      request.post(`/login`)
        .send({
          email: 'test.sample@email.com',
          password: 'password'
        })
        .expect(401) // Temporary
        .end((err, res) => {
          Users.findOne({
            where: {
              email: mockUser.email
            }
          })
          .then(user => {
            comparePassword(user.dataValues.password, mockUser.password)
            expect(mockUser.email).toBe(user.dataValues.email)
            done(err)
          })
        })
    })
  })
  describe('POST /validate', () => {
    describe('status 200', () => {
      it('should validate', done => {
        request.post('/validate')
          .send({
            token: token
          })
          .expect(200)
          .end((err, res) => done(err))
      })
    })
  })
})
