import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
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

export const getAllUsers = async (req, res) => {
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
