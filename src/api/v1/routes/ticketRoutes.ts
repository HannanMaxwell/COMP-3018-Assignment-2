import express, { Router } from "express";
import * as ticketController from "../controllers/ticketController";

const router: Router = express.Router();

router.get("/tickets", ticketController.getAllTickets);
router.get("/tickets/:id/urgency", ticketController.getTicketUrgency);
router.post("/tickets", ticketController.createTicket);
router.put("/tickets/:id", ticketController.updateTicket);
router.delete("/tickets/:id", ticketController.deleteTicket);


export default router;