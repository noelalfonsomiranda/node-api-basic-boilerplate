'use strict'

const { hash } = require('../services/bcrypt.service')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: '7c99cff9-f26e-4072-8a41-a27091644a1d',
      email: 'admin@mailinator.com',
      password: hash('p@ssw0rd'),
      firstName: 'Admin',
      lastName: 'Test',
      role: 'super_admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      role: 'super_admin'
    }, {})
  }
};
