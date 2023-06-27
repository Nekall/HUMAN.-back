import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description, priority, createdBy, assignedTo } = req.body;

    const ticket = new Ticket({
      title,
      description,
      priority,
      createdBy,
      assignedTo,
    });

    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: "Error creating ticket", error: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("createdBy").populate("assignedTo");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error getting tickets", error: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate("createdBy").populate("assignedTo");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error getting ticket", error: error.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, createdBy, assignedTo } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { title, description, priority, createdBy, assignedTo },
      { new: true }
    ).populate("createdBy").populate("assignedTo");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket", error: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ticket", error: error.message });
  }
};
