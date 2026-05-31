export type TicketPriority = "High" | "Medium" | "Low";
export type TicketStatus = "Open" | "In Progress" | "Closed";

export type Ticket = {
  _id: string;        // MongoDB uses _id not id
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
};