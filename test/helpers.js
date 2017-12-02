const supertest = require('supertest')
const app = require('../app.js')

global.app = app
global.request = supertest(app)
