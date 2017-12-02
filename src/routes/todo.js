const todosController = require('../controllers').todos

module.exports = (app) => {
  app.post('/api/todos', todosController.create)
  app.get('/api/todos', todosController.list)
  app.get('/api/todos/:todoId', todosController.retrieve)
  app.put('/api/todos/:todoId', todosController.update)
  app.delete('/api/todos/:todoId', todosController.destroy)
}
