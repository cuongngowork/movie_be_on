import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie API Project for mongodb',
      version: '1.0.0',
      description: 'A simple Movie API application',
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
        description: 'Localhost server',
      },
      {
        url: 'https://movie-be-on.onrender.com/api/v1',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/userRoutes.js', './routes/movieRoutes.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
