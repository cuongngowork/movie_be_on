import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  year: {
    type: String,
    require: true
  },
  poster: {
    type: String,
    require: true
  }
}, { timeStamps: true })

const Movie = mongoose.model('Movies', MovieSchema);
export default Movie;
