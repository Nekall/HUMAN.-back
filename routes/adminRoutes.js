import express from "express";
import { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/admins", createAdmin);
router.get("/admins", getAllAdmins);
router.get("/admins/:id", getAdminById);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

export default router;
