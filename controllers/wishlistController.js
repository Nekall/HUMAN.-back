import Wishlist from "../models/Wishlist.js";

export const createWishlist = async (req, res) => {
  try {
    const { user, products } = req.body;

    const wishlist = new Wishlist({
      user,
      products,
    });

    const savedWishlist = await wishlist.save();
    res.status(201).json({
      success: true,
      message: "Successfully created wishlist",
      data: savedWishlist,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating wishlist",
        error: error.message,
      });
  }
};

export const getWishlistByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "user products"
    );
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched wishlist",
      data: wishlist,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error getting wishlist",
        error: error.message,
      });
  }
};

export const updateWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { products } = req.body;

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { products },
      { new: true }
    ).populate("user products");

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully updated wishlist",
      data: wishlist,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating wishlist",
        error: error.message,
      });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOneAndDelete({ user: userId });
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Wishlist deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting wishlist",
        error: error.message,
      });
  }
};
