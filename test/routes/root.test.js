// const usersController = require('../../src/controllers').users
const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)

describe('Test the root path', () => {
  it('It should response the GET method', done => {
    request.get('/')
      .expect(200)
      .then(res => {
        expect(typeof res.body.message).toBe('string')
        expect(res.body.message).toBe('Welcome to the beginning of nothingness.')
        done()
      })
  })
})
