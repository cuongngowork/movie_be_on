import jwt from "jsonwebtoken";
import { handleResponseError } from "../utils/response.js";

export const auth = async (req, res, next) => {
  const { authorization } = req.headers
  // console.log("authorization in auth middlewares", authorization)
  if (!authorization) {
    handleResponseError(res, 401, "Invalid authorization")
    return
  }
  const accessToken = authorization.split(" ")[1]
  // console.log("accessToken", accessToken)
  try {
    // console.log("process", process.env.SECRET)
    const { user } = jwt.verify(accessToken, process.env.SECRET)
    if (!user) {
      handleResponseError(res, 401, "You are not authenticated")
      return
    }
    next()
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}

export const authAdmin = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    handleResponseError(res, 401, "Invalid authorization")
    return
  }
  const accessToken = authorization.split(" ")[1]
  try {
    const { user } = jwt.verify(accessToken, process.env.SECRET)
    if (!user) {
      handleResponseError(res, 401, "You are not authenticated")
      return
    }
    if (user.role !== "admin") {
      handleResponseError(res, 403, "Forbidden")
      return
    }
    next()
  } catch (error) {
    handleResponseError(res, 500, error.message)
  }
}
