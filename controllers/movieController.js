import mongoose from 'mongoose';
import Movie from '../models/MovieModel.js';
import { handleResponseError, handleResponseSuccess } from '../utils/response.js';

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    handleResponseSuccess(res, 200, "Get movies success", movies);
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}

const createNewMovie = async (req, res) => {
  const { title, year, poster } = req.body;
  if (!title || !year || !poster) {
    handleResponseError(res, 400, "All fields required");
    return
  }
  try {
    const newMovie = await Movie.create({ ...req.body })
    handleResponseSuccess(res, 201, "Movie created success", newMovie);
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}

const updateMovie = async (req, res) => {
  const { title, year, poster } = req.body;
  console.log({title, year, poster})
  if (!title || !year || !poster) {
    handleResponseError(res, 400, "All fields required");
    return
  }
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleResponseError(res, 400, "Incorrect ID")
    return
  }

  const movie = await Movie.findById(id)
  if (!movie) {
    handleResponseError(res, 404, "Movie not found")
    return
  }

  try {
    await movie.updateOne({ ...req.body })
    handleResponseSuccess(res, 200, "Movie updated successfully", {title, year, poster});
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}

const deleteMovie = async (req, res) => {
  // 24-character hexadecimal string format id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleResponseError(res, 400, "Incorrect ID")
    return
  }

  const movie = await Movie.findById(id)
  if (!movie) {
    handleResponseError(res, 404, "Movie not found")
    return
  }

  try {
    await Movie.findByIdAndDelete(id)
    handleResponseSuccess(res, 200, "Delete movie success");
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}

export { getMovies, createNewMovie, updateMovie, deleteMovie }
