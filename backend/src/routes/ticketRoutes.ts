import express from "express";
import { getTickets, createTicket, deleteTicket, getTicketStats } from "../controllers/ticketController";

const router = express.Router();

// /stats MUST come before /:id
router.get("/stats", getTicketStats);
router.get("/", getTickets);
router.post("/", createTicket);
router.delete("/:id", deleteTicket);

export default router;