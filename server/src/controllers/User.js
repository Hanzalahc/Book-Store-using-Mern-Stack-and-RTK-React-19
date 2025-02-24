import User from "../models/User.js";
import bcypt from "bcrypt";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateTokens } from "../utils/generateTokens.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new apiError(400, "email and password are required"));
  }

  const formatedEmail = email.trim().toLowerCase().replace(/\s+/g, "");

  const existedUser = await User.findOne({ email: formatedEmail });

  if (existedUser) {
    return next(new apiError(409, "User already exists with this email"));
  }

  const hashedPassword = await bcypt.hash(password, 10);

  const user = await User.create({
    email: formatedEmail,
    password: hashedPassword,
  });

  if (!user) {
    return next(new apiError(500, "Something went wrong while creating user"));
  }

  return res.status(201).json({
    success: true,
    message: "Admin created successfully",
    data: {
      ...user._doc,
      password: undefined,
    },
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new apiError(400, "email and password are required"));
  }

  const formatedEmail = email.trim().toLowerCase().replace(/\s+/g, "");

  const user = await User.findOne({
    email: formatedEmail,
  });

  if (!user) {
    return next(new apiError(404, "User not found"));
  }

  const isPasswordValid = await bcypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new apiError(401, "Invalid credentials"));
  }

  const payload = {
    userId: user._id,
    userRole: user.role,
  };

  const { accessToken, refreshToken } = generateTokens(payload);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_SS || "lax",
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      ...user._doc,
      password: undefined,
    },
  });
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_SS || "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ success: true, message: "Logged out successfully" });
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: req.user,
  });
});
