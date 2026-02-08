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
    
    if (!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }
    
    const calculated = ticketService.calculateUrgency(ticket);
    res.status(HTTP_STATUS.OK).json({ message: "Ticket urgency calculated", data: calculated });
};

export const createTicket = (req: Request, res: Response) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required fields" });
        return;
    }

    const newTicket = ticketService.createTicket({ title, description, priority });
    res.status(HTTP_STATUS.CREATED).json({ message: "Ticket created", data: newTicket });
};

export const updateTicket = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updated = ticketService.updateTicket(id, req.body);
    
    if (!updated) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }
    
    res.status(HTTP_STATUS.OK).json({ message: "Ticket updated", data: updated });
};

export const deleteTicket = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const success = ticketService.deleteTicket(id);
    
    if (!success) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }
    
    res.status(HTTP_STATUS.OK).json({ message: "Ticket deleted" });
};

