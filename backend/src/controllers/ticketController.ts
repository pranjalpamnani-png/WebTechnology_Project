import { Request, Response } from "express";
import Ticket from "../models/Ticket";

// GET /tickets
export const getTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

// POST /tickets
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subject, description, priority, status } = req.body;

    if (!subject || !description || !priority || !status) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const validPriorities = ["Low", "Medium", "High"];
    const validStatuses = ["Open", "In Progress", "Closed"];

    if (!validPriorities.includes(priority)) {
      res.status(400).json({ message: "Invalid priority value" });
      return;
    }
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    const newTicket = new Ticket({ subject, description, priority, status });
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: "Failed to create ticket" });
  }
};

// DELETE /tickets/:id
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Ticket.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete ticket" });
  }
};

// GET /tickets/stats  ← Group 9 Product Feature
export const getTicketStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const highPriority = await Ticket.countDocuments({ priority: "High" });
    const inProgress = await Ticket.countDocuments({ status: "In Progress" });
    const closed = await Ticket.countDocuments({ status: "Closed" });
    const open = await Ticket.countDocuments({ status: "Open" });

    res.json({ totalTickets, highPriority, inProgress, closed, open });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};