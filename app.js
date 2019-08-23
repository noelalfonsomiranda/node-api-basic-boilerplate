const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const path = require('path')
const passport = require('passport')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const auth = require('./src/services/passport.service')()
const errorHandler = require('./src/services/errorHandler.service')

const app = express()

app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser())
app.use(cors({
  origin: [
    'http://localhost:8080'
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['DNT', 'X-CustomHeader', 'Keep-Alive', 'User-Agent', 'X-Requested-With', 'If-Modified-Since', 'Cache-Control', 'Content-Type', 'Content-Range', 'Range', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(compression({ threshold: 0 })) // Set threshold to 0 to activate the gzip
app.use(auth.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/*', auth.authenticate())

require('./src/routes')(app)

// Swagger Docs
require('./lib/swagger-options')(app)

app.get('*', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the beginning of nothingness.'
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })
app.use(errorHandler)

module.exports = app
