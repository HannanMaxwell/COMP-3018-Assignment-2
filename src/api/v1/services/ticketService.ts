export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: "critical" | "high" | "medium" | "low";
    status: "open" | "in-progress" | "resolved";
    createdAt: string;
    ticketAge?: number;
    urgencyScore?: number;
    urgencyLevel?: string;
}

const PRIORITY_SCORES = { critical: 50, high: 30, medium: 20, low: 10 };
const AGE_MULTIPLIER = 5;

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

let tickets: Ticket[] = [
    { id: 1, title: "Update footer", description: "Still 2024", priority: "low", status: "open", createdAt: daysAgo(3) },
    { id: 2, title: "Profile picture slow", description: "30s delay", priority: "medium", status: "open", createdAt: daysAgo(2) },
    { id: 3, title: "Dashboard lag", description: "10s lag", priority: "medium", status: "open", createdAt: daysAgo(6) },
    { id: 4, title: "Password reset", description: "30min delay", priority: "high", status: "open", createdAt: daysAgo(4) },
    { id: 5, title: "Export to PDF not working", description: "PDF export fails silently", priority: "high", status: "open", createdAt: daysAgo(6) },
    { id: 6, title: "Login blank", description: "Critical error", priority: "critical", status: "open", createdAt: daysAgo(6) },
    { id: 7, title: "Dark mode", description: "Won't persist", priority: "medium", status: "resolved", createdAt: daysAgo(10) }
];


export const calculateUrgency = (ticket: Ticket): Ticket => {
    const createdDate = new Date(ticket.createdAt);
    const daysOld = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let urgencyScore = PRIORITY_SCORES[ticket.priority] + (daysOld * AGE_MULTIPLIER);
    let urgencyLevel = "";

    if (ticket.status === "resolved") {
        urgencyScore = 0;
        urgencyLevel = "Minimal. Ticket resolved.";
    } else {

        if (urgencyScore >= 80) urgencyLevel = "Critical. Immediate attention required.";
        else if (urgencyScore >= 50) urgencyLevel = "High urgency. Prioritize resolution."; 
        else if (urgencyScore >= 30) urgencyLevel = "Moderate. Schedule for attention.";
        else urgencyLevel = "Low urgency. Address when capacity allows.";
    }

    return { ...structuredClone(ticket), ticketAge: daysOld, urgencyScore, urgencyLevel };
};

export const getAllTickets = (): Ticket[] => structuredClone(tickets);

export const getTicketById = (id: number): Ticket | undefined => {
    const ticket = tickets.find(t => t.id === id);
    return ticket ? structuredClone(ticket) : undefined;
};

export const createTicket = (data: Pick<Ticket, "title" | "description" | "priority">): Ticket => {
    const newTicket: Ticket = {
        id: tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
        ...data,
        status: "open",
        createdAt: new Date().toISOString()
    };
    tickets.push(newTicket);
    return structuredClone(newTicket);
};

export const updateTicket = (id: number, data: Partial<Ticket>): Ticket | null => {
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return null;
    tickets[index] = { ...tickets[index], ...data };
    return structuredClone(tickets[index]);
};

export const deleteTicket = (id: number): boolean => {
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return false;
    tickets.splice(index, 1);
    return true;
};