import mongoose from "mongoose";

// Define your schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: 'user'
  }
}, { timeStamps: true })

// Create a model
const User = mongoose.model('Users', UserSchema);
export default User;
