import { Request, Response } from "express";
import * as ticketController from "../src/api/v1/controllers/ticketController";
import * as ticketService from "../src/api/v1/services/ticketService";
import { HTTP_STATUS } from "../src/constants/httpStatus";


jest.mock("../src/api/v1/services/ticketService");

describe("Ticket Controller (Mocked Service)", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe("createTicket", () => {
        it("should return 201 and call service when valid data is provided", () => {
            // Arrange
            mockReq.body = { title: "New Ticket", description: "Desc", priority: "high" };
            const mockCreatedTicket = { id: 10, ...mockReq.body };
            (ticketService.createTicket as jest.Mock).mockReturnValue(mockCreatedTicket);

            // Act
            ticketController.createTicket(mockReq as Request, mockRes as Response);

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Ticket created",
                data: mockCreatedTicket
            });
        });

        it("should return 400 when title is missing", () => {
            // Arrange
            mockReq.body = { description: "Missing title", priority: "low" };

            // Act
            ticketController.createTicket(mockReq as Request, mockRes as Response);

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Missing required fields"
            });
        });
    });

    describe("getTicketUrgency", () => {
        it("should return 404 if the service cannot find the ticket", () => {
            // Arrange
            mockReq.params = { id: "999" };
            (ticketService.getTicketById as jest.Mock).mockReturnValue(undefined);

            // Act
            ticketController.getTicketUrgency(mockReq as Request, mockRes as Response);

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Ticket not found"
            });
        });
    });
});