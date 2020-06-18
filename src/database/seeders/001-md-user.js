const { users } = require('../fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('mdUser', users, {
      ignoreDuplicates: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('mdUser', null, {})
  }
}
