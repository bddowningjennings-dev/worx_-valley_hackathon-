const Tasks = require('../controllers/tasks')

module.exports = (app) => {
  app.get('/', (req,res)=> {
    return res.send('hi, connected to routes.js!...')
  })
  app.get('/tasks/search?:query', Tasks.search)
  app.post('/tasks', Tasks.create)
  app.get('/tasks', Tasks.index)
  app.get('/tasks/:id', Tasks.show)
  app.delete('/tasks/:id', Tasks.destroy)
  app.put('/tasks/:id', Tasks.update)
}