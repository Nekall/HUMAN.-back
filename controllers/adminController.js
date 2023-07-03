import Admin from "../models/Admin.js";

export const createAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const admin = new Admin({
      username,
      password,
      email,
    });

    const savedAdmin = await admin.save();
    res.status(201).json({
      success: true,
      message: "Successfully created admin",
      data: savedAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: error.message,
    });
  }
};

export const getAllAdmins = async (_, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all admins",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting admins",
      error: error.message,
    });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched admin",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting admin",
      error: error.message,
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      id,
      { username, password, email },
      { new: true }
    );

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully updated admin",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating admin",
      error: error.message,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting admin",
      error: error.message,
    });
  }
};
