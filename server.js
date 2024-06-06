import express from 'express';
import { movieRoutes } from './routes/movieRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js';

// import swaggerDocument from './swagger.json'
// import swaggerDocument from 'file:///C:/Users/CUONG63/Desktop/movie_be_on/swagger.json' assert { type: 'json' };

const app = express();
app.use(cors());
app.use(express.json())
dotenv.config()

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/movies", movieRoutes)
app.use("/api/v1/auth", userRoutes)


// Địa chỉ của MongoDB, thay thế 'mongodb://localhost:27017' bằng địa chỉ của cơ sở dữ liệu MongoDB của bạn
// const uri = 'mongodb://127.0.0.1:27017';

// Tên của cơ sở dữ liệu
// const dbName = 'demo_db';

// Kết nối tới MongoDB
mongoose.connect(process.env.DB_URI, { dbName: "demo_db"})
  .then(() => {
    console.log("connected to db");
    app.listen(4000, () => console.log("run 4000"))
  })
  .catch((err) => {
    console.log(err);
  });
