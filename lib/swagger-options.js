const swaggerJSDoc = require('./index')

module.exports = (app) => {
  // Swagger definition
  // You can set every attribute except paths and swagger
  // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
  const swaggerDefinition = {
    info: { // API informations (required)
      title: 'Hello World', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'A sample API' // Description (optional)
    },
    host: process.env.DB_HOST + ':' + process.env.PORT, // Host (optional)
    basePath: '/', // Base path (optional)
    securityDefinitions: {
      JWT: {
        description: '',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  }

  // Options for the swagger docs
  const options = {
    // Import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // Path to the API docs
    apis: [
      './src/routes/*',
      './parameters.yaml'
    ]
  }

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options)

  // Serve swagger docs the way you like (Recommendation: swagger-tools)
  app.get('/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}