import Cart from "../models/Cart.js";

export const createCartItem = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    const cartItem = {
      product,
      quantity,
    };

    const cart = await Cart.findOne({ user });

    if (cart) {
      cart.items.push(cartItem);
      await cart.save();
      res.status(201).json({
        success: true,
        message: "Successfully added item to cart",
        data: cart,
      });
    } else {
      const newCart = new Cart({
        user,
        items: [cartItem],
      });
      await newCart.save();
      res.status(201).json({
        success: true,
        message: "Successfully created cart",
        data: newCart,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating cart item",
      error: error.message,
    });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { user, cartItemId, quantity } = req.body;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item._id.toString() === cartItemId
    );

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    cartItem.quantity = quantity;

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Successfully updated cart item quantity",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart item quantity",
      error: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { user, cartItemId } = req.params;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const cartItemIndex = cart.items.findIndex(
      (item) => item._id.toString() === cartItemId
    );

    if (cartItemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    cart.items.splice(cartItemIndex, 1);

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Successfully deleted cart item",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting cart item",
      error: error.message,
    });
  }
};

export const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting cart",
      error: error.message,
    });
  }
};
