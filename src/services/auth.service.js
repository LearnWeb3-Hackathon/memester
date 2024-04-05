// Auth Service

const User = require("../models/user.model");
const AppError = require("../utils/error.util");

async function getUser(id) {
  return (await User.findById(id));
}

async function registerUser(name, email, ethAddress, farCasterId, Imagelink) {
  // Check if the user already exists by email or Ethereum address to avoid duplicates
  const existingUser = await User.findOne({ $or: [{email: email}, {ethAddress: ethAddress}] });
  if (existingUser) {
    throw new AppError('User already exists with this email or Ethereum address', 400);
  }

  // Create a new user
  const newUser = new User({
    email,
    ethAddress, // Use the ethAddress parameter
    farCasterId,
    Imagelink
  });

  // Save the new user to the database
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new AppError('Error registering user', 500);
  }
}


async function loginUser(ethAddress) {
  // Find the user by their Ethereum address
  const user = await User.findOne({ ethAddress: ethAddress });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Assuming signature verification happens elsewhere and was successful

  return user; // Return the found user
}

module.exports = {
  getUser,
  registerUser,
  loginUser
};