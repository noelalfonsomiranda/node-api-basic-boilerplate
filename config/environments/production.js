module.exports = {
  apiUrl: process.env.API_BASE_URL,
  appUrl: process.env.APP_BASE_URL,
  version: process.env.APP_VERSION,
  port: process.env.PORT || 5000,
  timezone: process.env.TIMEZONE,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
  authSecret: process.env.SECRET,
  authSession: {
    session: false
  }
}
