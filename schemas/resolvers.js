import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import mongoose from 'mongoose';
import Movie from '../models/MovieModel.js';

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "1d" })
}

const resolvers = {
  Query: {
    getMovies: async (parent, __, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      const movies = await Movie.find()
      return movies
    },
    getMovieById: async (parent, { id }, { user }) => { 
      if (!user) {
        throw new Error('You are not authenticated!')
      }
      console.log("getMovieById", id)
      console.log("typeof", typeof id)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid movie id')
      }
      const checkMovieInDb = await Movie.findById(id)
      if (!checkMovieInDb) {
        throw new Error('Movie id not found')
      }
      console.log("checkMovieInDb", checkMovieInDb)
      console.log("checkMovieInDb _doc", checkMovieInDb._doc)

      return { ...checkMovieInDb }
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      try {
        if (!email) {
          throw new Error('Email is required')
        }
        if (!password) {
          throw new Error('Password is required')
        }

        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const newUser = await User.create({ email, password: hashedPassword })

        return newUser;
      } catch (error) {
        console.log('error msg', error)
        throw new Error(error.message); 
      }
    },


    login: async (_, { email, password }) => {
      if (!email) { 
        throw new Error('Email is required')
      }
      if (!password) {
        throw new Error('Password is required')
      }

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Email is incorrect');
      }

      const isMatch = await bcrypt.compare(password, user.password)
      
      if (!isMatch) {
        throw new Error('Incorrect password');
      }

      const accessToken = generateAccessToken(user)
      user.token = accessToken;
      return user;
    },

    logout: async (_, __, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      return {
        success: true,
        message: "Logout success"
      };
    },

    createNewMovie: async (_, { title, year, poster }, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      if (!title || !year || !poster) {
        throw new Error('All fields required');
      }
      try {
        const newMovie = await Movie.create({ title, year, poster })
        console.log("new movie", newMovie)
        return newMovie
      } catch (error) {
        throw new Error(error.message)
      }
    },
    updateMovie: async (_, { id, title, year, poster }, { user }) => {
      console.log("user in update movie", user)
      console.log(!user || user.user.role !== "admin")
      if (!user) {
        throw new Error('You are not authenticated! first');
      }
      console.log("user role", user.user.role)
      if (user.user.role !== "admin") {
        throw new Error('Forbidden');
      }
      if (!title ||!year ||!poster) {
        throw new Error('All fields required');
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid movie id')
      }
      try {
        const checkMovieInDb = await Movie.findById(id)
        console.log("checkMovieInDb", checkMovieInDb)
        if (!checkMovieInDb) {
          throw new Error('Movie id not found')
        }
        const updatedMovie = await checkMovieInDb.updateOne({ title, year, poster })
        console.log("updatedMovie", updatedMovie)
        return { ...checkMovieInDb, id, title, year, poster}
      } catch (error) {
        throw new Error(error.message)
      }
    },
    deleteMovie: async (_, { id }, { user }) => { 
      if (!user || user.user.role!== "admin") {
        throw new Error('You are not authenticated!');
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid movie id')
      }
      try {
        const checkMovieInDb = await Movie.findById(id)
        if (!checkMovieInDb) {
          throw new Error('Movie id not found')
        }
        await Movie.findByIdAndDelete(id)
        return {
          success: true,
          message: "Delete movie successfully"
        };
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
};

export default resolvers;
