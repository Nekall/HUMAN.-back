import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/tickets", createTicket);
router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicketById);
router.put("/tickets/:id", updateTicket);
router.delete("/tickets/:id", deleteTicket);

export default router;
