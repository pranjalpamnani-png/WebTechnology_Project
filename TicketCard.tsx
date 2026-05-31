import { Ticket } from "../types/ticket";

type TicketCardProps = {
  ticket: Ticket;
  onDelete: (id: number) => void;
  onEdit?: (ticket: Ticket) => void;
};

const priorityClass: Record<string, string> = {
  Low: "badge badge-low",
  Medium: "badge badge-medium",
  High: "badge badge-high",
};

const statusClass: Record<string, string> = {
  Open: "badge badge-open",
  "In Progress": "badge badge-progress",
  Closed: "badge badge-closed",
};

const TicketCard = ({ ticket, onDelete, onEdit }: TicketCardProps) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h4 className="ticket-subject">{ticket.subject}</h4>

        <div
          className="ticket-badges"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <span className={priorityClass[ticket.priority]}>
            Priority: {ticket.priority}
          </span>

          <span className={statusClass[ticket.status]}>
            Status: {ticket.status}
          </span>
        </div>
      </div>

      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-footer">
        <span className="ticket-date">
          Created: {ticket.createdAt}
        </span>

        <div className="ticket-actions">
          {onEdit && (
            <button
              className="btn-edit"
              onClick={() => onEdit(ticket)}
            >
              Edit
            </button>
          )}

          <button
            className="btn-delete"
            onClick={() => onDelete(ticket.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;