const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  hash: password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds), null)
  },
  comparePassword: (password, hash) => (
    bcrypt.compareSync(password, hash)
  )
}
