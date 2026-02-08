import request from "supertest";
import app from "../src/app";
import * as ticketController from "../src/api/v1/controllers/ticketController";

jest.mock("../src/api/v1/controllers/ticketController", () => ({
    getAllTickets: jest.fn((req, res) => res.status(200).send()),
    getTicketUrgency: jest.fn((req, res) => res.status(200).send()),
    createTicket: jest.fn((req, res) => res.status(201).send()),
    updateTicket: jest.fn((req, res) => res.status(200).send()),
    deleteTicket: jest.fn((req, res) => res.status(200).send()),
}));

describe("Ticket API Routes (Mocked Controller)", () => {

    it("should call getAllTickets controller when GET /api/v1/tickets is hit", async () => {
        // Arrange
        const endpoint = "/api/v1/tickets";

        // Act
        await request(app).get(endpoint);

        // Assert
        expect(ticketController.getAllTickets).toHaveBeenCalled();
    });

    it("should call getTicketUrgency controller when GET /api/v1/tickets/:id/urgency is hit", async () => {
        // Arrange
        const endpoint = "/api/v1/tickets/1/urgency";

        // Act
        await request(app).get(endpoint);

        // Assert
        expect(ticketController.getTicketUrgency).toHaveBeenCalled();
    });

    it("should call createTicket controller when POST /api/v1/tickets is hit", async () => {
        // Arrange
        const endpoint = "/api/v1/tickets";
        const payload = { title: "Test", description: "Test", priority: "low" };

        // Act
        await request(app).post(endpoint).send(payload);

        // Assert
        expect(ticketController.createTicket).toHaveBeenCalled();
    });

    it("should call updateTicket controller when PUT /api/v1/tickets/:id is hit", async () => {
        // Arrange
        const endpoint = "/api/v1/tickets/1";
        const payload = { status: "in-progress" };

        // Act
        await request(app).put(endpoint).send(payload);

        // Assert
        expect(ticketController.updateTicket).toHaveBeenCalled();
    });

    it("should call deleteTicket controller when DELETE /api/v1/tickets/:id is hit", async () => {
        // Arrange
        const endpoint = "/api/v1/tickets/1";

        // Act
        await request(app).delete(endpoint);

        // Assert
        expect(ticketController.deleteTicket).toHaveBeenCalled();
    });
});