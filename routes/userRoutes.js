import express from "express";
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
