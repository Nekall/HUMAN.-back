import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Model
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  req.body.password = hashedPassword;

  try {
    let newUser = await User.create(req.body);
    newUser = newUser.toObject();
    delete newUser.password;

    res.status(201).json({
      success: true,
      message: "Successfully created user",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get user" });
  }
};

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json({
      success: true,
      message: "Successfully updated user",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Successfully deleted user",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Successfully logged in",
      data: token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
