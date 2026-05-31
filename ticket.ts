export type Ticket = {
  id: number;
  title: string;
  status: "Open" | "In Progress" | "Closed";
  priority: "High" | "Medium" | "Low";
};