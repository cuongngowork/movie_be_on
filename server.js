import express from 'express';
import { movieRoutes } from './routes/movieRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js';

import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { renderPlaygroundPage } from 'graphql-playground-html';
import connectDB from './config/db.js';

// import ApolloServer from 'apollo-server-express';
import { getUser } from './middlewares/auth.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

const app = express();
app.use(cors());
app.use(express.json())
dotenv.config()

// Set up GraphQL Playground for easier testing
// app.get('/playground', (req, res) => {
//   res.send(renderPlaygroundPage({ endpoint: '/graphql' }));
// });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/movies", movieRoutes)
app.use("/api/v1/auth", userRoutes)

// Địa chỉ của MongoDB, thay thế 'mongodb://localhost:27017' bằng địa chỉ của cơ sở dữ liệu MongoDB của bạn
// const uri = 'mongodb://127.0.0.1:27017';

// Tên của cơ sở dữ liệu
// const dbName = 'demo_db';

// Kết nối tới MongoDB
// mongoose.connect(process.env.DB_URI, { dbName: "demo_db"})
//   .then(() => {
//     console.log("connected to db");
//     app.listen(4000, () => console.log("run 4000"))
//   })
//   .catch((err) => {
//     console.log(err);
//   });


connectDB();

// Khởi tạo Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);
    return { user };
  },
});


await server.start();

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      user: getUser(req.headers.authorization),
    }),
  }),
);

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000/graphql`)
);
