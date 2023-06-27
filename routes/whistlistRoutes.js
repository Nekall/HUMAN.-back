import express from "express";
import {
  createWishlist,
  getWishlistByUser,
  updateWishlist,
  deleteWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/", createWishlist);
router.get("/:userId", getWishlistByUser);
router.put("/:userId", updateWishlist);
router.delete("/:userId", deleteWishlist);

export default router;
