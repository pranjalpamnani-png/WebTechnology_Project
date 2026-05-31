import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import type { Ticket } from "../types/ticket";

type CreateTicketPageProps = {
  onCreateTicket: (ticket: Ticket) => void;
  onUpdateTicket: (ticket: Ticket) => void;
  editingTicket: Ticket | null;
};

const CreateTicketPage = ({ onCreateTicket, onUpdateTicket, editingTicket }: CreateTicketPageProps) => {
  const navigate = useNavigate();

  const handleCreate = (ticket: Ticket) => {
    onCreateTicket(ticket);
    navigate("/");
  };

  const handleUpdate = (ticket: Ticket) => {
    onUpdateTicket(ticket);
    navigate("/");
  };

  return (
    <div className="page">
      <div className="page-title">
        <h2>{editingTicket ? "Edit Ticket" : "Create New Ticket"}</h2>
        <p className="muted">
          {editingTicket
            ? "Update the ticket details below."
            : "Fill in the form below to submit a new support ticket."}
        </p>
      </div>

      <div className="form-card">
        <TicketForm
          onCreateTicket={handleCreate}
          onUpdateTicket={handleUpdate}
          editingTicket={editingTicket}
        />
      </div>
    </div>
  );
};

export default CreateTicketPage;