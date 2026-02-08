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
    { id: 4, title: "Password reset", description: "30min delay", priority: "high", status: "open", createdAt: daysAgo(5) },
    { id: 6, title: "Login blank", description: "Critical error", priority: "critical", status: "open", createdAt: daysAgo(6) },
    { id: 7, title: "Dark mode", description: "Won't persist", priority: "medium", status: "resolved", createdAt: daysAgo(10) }
];