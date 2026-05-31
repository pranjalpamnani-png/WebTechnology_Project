import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  subject: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Closed";
  createdAt: Date;
}

const TicketSchema: Schema = new Schema(
  {
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
    status: { type: String, enum: ["Open", "In Progress", "Closed"], required: true },
  },
  { timestamps: true }
);

const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);
export default Ticket;