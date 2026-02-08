import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import * as ticketService from "../services/ticketService";

export const getAllTickets = (req: Request, res: Response) => {
    const tickets = ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).json({ message: "Tickets retrieved", count: tickets.length, data: tickets });
};