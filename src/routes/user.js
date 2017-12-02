const usersController = require('../controllers').users

module.exports = (app) => {
  /********************
  MODELS
  *********************/
  /**
   * @swagger
   * definitions:
   *   user:
   *     required:
   *       - email
   *       - password
   *     properties:
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       email:
   *         type: string
   *       password:
   *         type: string
   */

  /********************
  SIGNUP
  *********************/
  /**
   * @swagger
   * /signup:
   *   post:
   *     description: Create user
   *     tags: [users]
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: firstName
   *         description: User object
   *         in: formData
   *         format: json
   *         type: string
   *       - name: lastName
   *         description: User object
   *         in: formData
   *         format: json
   *         type: string
   *       - $ref: '#/parameters/email'
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         format: json
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          $ref: '#/definitions/user'
   */
  app.post('/signup', usersController.create)

  /********************
  LOGIN
  *********************/
  /**
   * @swagger
   * /login:
   *   post:
   *     description: Login to the application
   *     tags:
   *       - users
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/email'
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         format: json
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: login
   */
  app.post('/login', usersController.login)

  /********************
  GET USERS
  *********************/
  /**
   * @swagger
   * /api/users:
   *   get:
   *     description: Get all users
   *     security:
   *       - JWT: []
   *     tags:
   *      - users
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: users
   */
  app.get('/api/users', usersController.list)

  /********************
  GET USER
  *********************/
  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     description: Get specific user
   *     security:
   *       - JWT: []
   *     tags:
   *       - users
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id.
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: user
   *         schema:
   *          $ref: '#/definitions/user'
   */
  app.get('/api/users/:userId', usersController.retrieve)

  /********************
  UPDATE USER
  *********************/
  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     description: Update specific user
   *     security:
   *       - JWT: []
   *     tags:
   *       - users
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id.
   *         in: path
   *         required: true
   *         type: string
   *       - name: firstName
   *         description: User object
   *         in: formData
   *         format: json
   *         type: string
   *       - name: lastName
   *         description: User object
   *         in: formData
   *         format: json
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         format: json
   *         type: string
   *     responses:
   *       200:
   *         description: user
   *         schema:
   *          $ref: '#/definitions/user'
   */
  app.put('/api/users/:userId', usersController.update)

  /********************
  DESTROY USER
  *********************/
  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     description: Destroy specific user
   *     security:
   *       - JWT: []
   *     tags:
   *       - users
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id.
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: user
   *         schema:
   *          $ref: '#/definitions/user'
   */
  app.delete('/api/users/:userId', usersController.destroy)

  /********************
  DESTROY USER
  *********************/
  /**
   * @swagger
   * /validate:
   *   post:
   *     description: Validate token
   *     tags:
   *       - authentication
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: User's token without bearer.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: token
   */
  app.post('/validate', usersController.validate)
}
