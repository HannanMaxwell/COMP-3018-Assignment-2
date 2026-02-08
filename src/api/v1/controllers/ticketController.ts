import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import * as ticketService from "../services/ticketService";

export const getAllTickets = (req: Request, res: Response) => {
    const tickets = ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).json({ message: "Tickets retrieved", count: tickets.length, data: tickets });
};

export const getTicketUrgency = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ticket = ticketService.getTicketById(id);
    if (!ticket) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    
    const calculated = ticketService.calculateUrgency(ticket);
    res.status(HTTP_STATUS.OK).json({ message: "Ticket urgency calculated", data: calculated });
};