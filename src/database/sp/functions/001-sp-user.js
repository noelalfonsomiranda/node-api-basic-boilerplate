'use strict'
const fs = require('fs')
module.exports = {
  up: function (queryInterface, Sequelize) {
    const sql = fs.readFileSync('src/database/sp/sql/001-sp-user.sql', 'utf8')
    return queryInterface.sequelize.query(sql)
  },
  down: function (queryInterface) {
    return queryInterface.sequelize.query('')
  }
}
