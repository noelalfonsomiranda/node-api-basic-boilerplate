const path = require('path')
const dotEnvPath = path.resolve('.env')

/**
 * since mocha don't see enviroment variables we have to use dotenv
 */
require('dotenv').config({ path: dotEnvPath })

module.exports = {
  development: {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'define': {
      'underscored': true
    },
    'dialectOptions': {
      useUTC: true // --> for reading from database
    },
    timezone: '00:00' // --> for writing to database
  },
  test: {
    'url': process.env.DATABASE_URL_TEST,
    'dialect': 'postgres',
    'define': {
      'underscored': true
    },
    'dialectOptions': {
      useUTC: true // --> for reading from database
    },
    timezone: '00:00', // --> for writing to database,
    logging: false // remove logs
  },
  staging: {
    'url': process.env.DATABASE_URL_STAGING,
    'dialect': 'postgres',
    'define': {
      'underscored': false
    },
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      },
      useUTC: true // --> for reading from database
    },
    timezone: '00:00' // --> for writing to database
  },
  uat: {
    'url': process.env.DATABASE_URL_UAT,
    'dialect': 'postgres',
    'define': {
      'underscored': false
    },
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      },
      useUTC: true // --> for reading from database
    },
    timezone: '00:00' // --> for writing to database
  },
  playground: {
    'url': process.env.DATABASE_URL_PLAYGROUND,
    'dialect': 'postgres',
    'define': {
      'underscored': false
    },
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      },
      useUTC: true // --> for reading from database
    },
    timezone: '00:00' // --> for writing to database
  },
  production: {
    'url': process.env.DATABASE_URL_PRODUCTION,
    'dialect': 'postgres',
    'define': {
      'underscored': false
    },
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      },
      useUTC: true // --> for reading from database
    },
    timezone: '00:00' // --> for writing to database
  }
}
