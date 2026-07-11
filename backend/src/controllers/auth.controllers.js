import User from "../models/user.model.js";
import validate from "../utils/validate.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import redisClient from "../config/redis.js"
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const signup = async (req, res) => {
  try {
    validate(req.body);
    // step1 :validate the data
    const {userName, emailId, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ emailId }, { userName }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email or username already exists",
      });
    }
    // step2 :hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // step3 :store the user into db
    const user = await User.create({
      userName,
      emailId,
      password: hashedPassword,
    });
    // step4 :generate a token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: '7d',
    }); // 1hr in seconds
    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge:7*24*60 * 60 * 1000,
    }); // 1 hour in miliseconds

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      user: userResponse,
      message: "signUp successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId?.trim() || !password?.trim()) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // match the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // send the token to user
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: '7d',
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge:7*24*60 * 60 * 1000,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
    user: userResponse,
    message: "Login Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({
        message: "No token found",
      });
    }
    const payload = jwt.decode(token);
    if (!payload) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    await redisClient.set(`project:chatly:token:${token}`, "Blocked");
    await redisClient.expireAt(`project:chatly:token:${token}`, payload.exp);

    res.clearCookie("token", {
      httpOnly: true,
      maxAge:7*24*60*60*1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

export const checkAuth = async(req,res)=>{
  try {
    const {token} = req.cookies
    if(!token){
      return res.status(401).json({
        message:"Invalid Token"
      })
    }
    const payload = jwt.verify(token,JWT_SECRET_KEY)
    if(!payload){
      return res.status(401).json({
        message:"Invalid Token"
      })
    }
    const {userId} = payload
    if(!userId){
      return res.status(401).json({
        message:"Invalid Token"
      })
    }
    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.status(401).json({
        message:"User not found"
      })
    }
    return res.status(200).json({
      message:"check auth successfully",
      user:user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
}

