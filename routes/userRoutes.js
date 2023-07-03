import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/login", login);
router.post("/forgot-password/:userId", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
