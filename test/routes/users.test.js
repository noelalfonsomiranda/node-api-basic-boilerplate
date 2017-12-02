const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)
const Users = require('../../src/models').User
const authService = require('../../src/services/auth.service')
// const { comparePassword } = require('../../src/services/bcrypt.service')

describe('User route', () => {
  let token
  let mockUser

  beforeEach(done => {
    Users
      .destroy({where: {}})
      .then(() => Users.create({
        firstName: 'Noel Alfonso',
        lastName: 'Miranda',
        email: 'noelalfonsomiranda@gmail.com',
        password: 'pass'
      }))
      .then((req, res) => {
        mockUser = req.dataValues
        token = authService.issue({id: req.dataValues.id})
        done()
      })
      .then(() => Users.create({
        firstName: 'Krystal Maureen',
        lastName: 'Galang',
        email: 'krystalmaureen@email.com',
        password: 'pass'
      }))
  })
  describe('GET /api/users', () => {
    describe('status 200', () => {
      it('returns a list of users', done => {
        request.get('/api/users')
          .set('Authorization', `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).toHaveLength(2)
            done(err)
          })
      })
    })
  })
  describe('DELETE /api/users/:userId', () => {
    describe('status 200', () => {
      it('deletes a user', done => {
        request.delete(`/api/users/${mockUser.id}`)
          .set('Authorization', `JWT ${token}`)
          .expect(200)
          .end((err, res) => done(err))
      })
    })
  })
  describe('POST /signup', () => {
    describe('status 200', () => {
      it('creates a new user', done => {
        request.post('/signup')
          .send({
            firstName: 'Aw',
            lastName: 'Wew',
            email: 'aw.wew@email.com',
            password: 'pass'
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body.user.firstName).toEqual('Aw')
            expect(res.body.user.lastName).toEqual('Wew')
            expect(res.body.user.email).toEqual('aw.wew@email.com')
            done(err)
          })
      })
    })
  })
  describe('POST /signup', () => {
    describe('status 400', () => {
      it('throws bad request when creating users failed/validation error', done => {
        request.post('/signup')
          .send({
            firstName: null,
            lastName: 'Wew',
            email: 'aw.wew@email.com',
            password: 'pass'
          })
        .expect(400).end((err, res) => {
          done(err)
        })
      })
    })
  })
  describe('PUT /api/users/:userId', () => {
    describe('status 200', () => {
      it('should update user', done => {
        request.put(`/api/users/${mockUser.id}`)
          .set('Authorization', `JWT ${token}`)
          .send({
            firstName: 'New Aw',
            lastName: 'Wew',
            email: 'aw.wew@email.com',
            password: 'pass'
          })
          .expect(200)
          .end((err, res) => {
            Users.findOne({
              where: {id: res.body.id}
            })
            .then(user => {
              expect(user.firstName).toBe('New Aw')
              done(err)
            })
          })
      })
    })
  })
})
