import express from "express";
import {
  createCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  getCartByUser,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart", createCartItem);
router.put("/cart", updateCartItemQuantity);
router.delete("/cart/:user/:cartItemId", deleteCartItem);
router.get("/cart/:userId", getCartByUser);

export default router;
