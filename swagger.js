import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie API with Swagger',
      version: '1.0.0',
      description: 'A simple Movie API application',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./routes/userRoutes.js', './routes/movieRoutes.js'],         // Files containing annotations
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
