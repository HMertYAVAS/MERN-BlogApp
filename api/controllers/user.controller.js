import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "Working this API!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (req.body.password !== undefined && req.body.password !== null && req.body.password !== '' ) {
    // Check if the length of the password is less than 6 characters
    if (req.body.password.length < 6) {
      // Return an error if the password length is insufficient
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    // Hash the password using bcryptjs with a salt round of 10
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  } else {
    // If the password field is empty or null, remove it from the request body
    delete req.body.password;
    return next(errorHandler(400, "Password can't be null"));
  }

   
    

  if (req.body.username !== undefined && req.body.username !== null && req.body.username !== '') {
/*     if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    } */
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  } else {
    // Handle case where username is null or empty
    return next(errorHandler(400, "Username can't be null"));
  }
  
  if(req.body.email !== undefined && req.body.email !== null && req.body.email !== ''){
    if(!req.body.email.includes('@') || !req.body.email.includes('.') ){
      return next(errorHandler(400, "Email is required"));
    }
  }else{
    return next(errorHandler(400, "Email can't be null"));

  }



  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
        $set:{
            username: req.body.username,
            email: req.body.email,
            profilePicture:req.body.profilePicture,
            password: req.body.password,
        }
    },{new:true})
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req,res,next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({message:"User Deleted"})
  } catch (error) {
    next(error)
  }
}

export const signoutUser = async (req,res,next) => {
  try {
    await res.clearCookie('access_token').status(200).json({message:"User Logged out"})
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};