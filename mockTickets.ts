import type { Ticket } from "../types/ticket";

const mockTickets: Ticket[] = [
  {
    id: 1,
    subject: "Cannot login to account",
    description: "User is unable to login using correct credentials.",
    priority: "High",
    status: "Open",
    createdAt: "2026-03-26",
  },
  {
    id: 2,
    subject: "Page not loading after update",
    description: "The dashboard page freezes after the latest deployment.",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-03-27",
  },
  {
    id: 3,
    subject: "Bug in ticket submission form",
    description: "Form submits even when required fields are empty.",
    priority: "Medium",
    status: "Open",
    createdAt: "2026-03-28",
  },
  {
    id: 4,
    subject: "Server error on file upload",
    description: "Uploading files larger than 2MB returns a 500 server error.",
    priority: "High",
    status: "Closed",
    createdAt: "2026-03-29",
  },
  {
    id: 5,
    subject: "UI alignment issue on mobile",
    description: "Navbar links overlap on screens smaller than 375px.",
    priority: "Low",
    status: "Open",
    createdAt: "2026-03-30",
  },
];

export default mockTickets;