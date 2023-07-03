import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const product = new Product({
      name,
      description,
      price,
      quantity,
    });

    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating product",
        error: error.message,
      });
  }
};

export const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all products",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error getting products",
        error: error.message,
      });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched product",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error getting product",
        error: error.message,
      });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, quantity },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully updated product",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating product",
        error: error.message,
      });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting product",
        error: error.message,
      });
  }
};
