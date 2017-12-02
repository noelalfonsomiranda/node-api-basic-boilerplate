const userRoutes = require('./user')
const todoRoutes = require('./todo')
const todoItemRoutes = require('./todoitem')

module.exports = (app) => {
  /**
   * @swagger
   * /:
   *   get:
   *     tags:
   *      - root
   *     description: Root
   *     responses:
   *       200:
   *         description: hello world
   */

  // middleware to use for all requests
  app.use((req, res, next) => {
    console.log('Something is happening.')
    next() // make sure we go to the next routes and don't stop here
  })

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!'
  }))

  userRoutes(app)
  todoRoutes(app)
  todoItemRoutes(app)
}
