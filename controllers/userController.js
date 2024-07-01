import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'
import { handleResponseError, handleResponseSuccess } from '../utils/response.js';
import admin from '../config/firebase-config.js';

export const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

const register = async (req, res) => {
  const { email, password } = req.body
  console.log({ email, password })
  if (!email || !password) {
    handleResponseError(res, 400, 'All fields required');
    return
  }

  const existEmail = await User.findOne({ email })
  if (existEmail) {
    handleResponseError(res, 400, 'Email already exists')
    return
  }

  const saltRound = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRound);

  try {
    const data = await User.create({ email, password: hashedPassword })
    console.log("data", data)
    handleResponseSuccess(res, 201, "Register successfully", {email: data.email, role: data.role})
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}

const login = async (req, res) => {
  console.log("req.body", req.body)
  const { email, password } = req.body

  if (!email || !password) {
    handleResponseError(res, 400, 'All fields required');
    return 
  }

  const user = await User.findOne({ email })
  if (!user) {
    handleResponseError(res, 401, 'Incorrect email');
    return
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    handleResponseError(res, 401, 'Incorrect password');
    return
  }

  try {
    const accessToken = generateAccessToken(user)
    handleResponseSuccess(res, 200, "Login successfully", { email, role: user.role, accessToken })
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}

// login and register in the case using gg account
const loginGoogle = async (req, res) => {
  const { email, idToken } = req.body

  // check idToken is correct or not
  try {
    const decodeValue = await admin.auth().verifyIdToken(idToken)

    // check email in decodeValue
    if (decodeValue.email === email) {
      const existEmail = await User.findOne({ email })
      console.log("existEmail", existEmail)

      // user have logged in 
      if (existEmail) {
        const accessToken = generateAccessToken(existEmail)
        handleResponseSuccess(res, 200, "Login successfully", { email, role: existEmail.role, accessToken })
        return
      }
      // user have not logged in
      else {
        const newUser = await User.create({ email })
        console.log("newUser", newUser)
        const accessToken = generateAccessToken(newUser)
        handleResponseSuccess(res, 200, "Login successfully", { email, role: newUser.role, accessToken })
        return
      }
    } else {
      handleResponseError(res, 400, 'Email verified failed')
      return
    }
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}

const logout = (req, res) => {
  // maybe delete refresh token in server
  res.send('logout success')
}


export { register, login, loginGoogle, logout }  
