import React, { useState, useEffect } from "react";
import { Ticket, TicketPriority, TicketStatus } from "../types/ticket";

type TicketFormProps = {
  onCreateTicket: (ticket: Ticket) => void;
  onUpdateTicket?: (ticket: Ticket) => void;
  editingTicket?: Ticket | null;
};

const TicketForm = ({ onCreateTicket, onUpdateTicket, editingTicket }: TicketFormProps) => {
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TicketPriority>("Low");
  const [status, setStatus] = useState<TicketStatus>("Open");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (editingTicket) {
      setSubject(editingTicket.subject);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
      setStatus(editingTicket.status);
      setError("");
    } else {
      setSubject("");
      setDescription("");
      setPriority("Low");
      setStatus("Open");
      setError("");
    }
  }, [editingTicket]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (subject.trim() === "") {
      setError("Ticket subject is required.");
      return;
    }

    setError("");

    if (editingTicket && onUpdateTicket) {
      const updated: Ticket = {
        ...editingTicket,
        subject: subject.trim(),
        description: description.trim(),
        priority,
        status,
      };
      onUpdateTicket(updated);
    } else {
      const newTicket: Ticket = {
        id: Date.now(),
        subject: subject.trim(),
        description: description.trim(),
        priority,
        status,
        createdAt: new Date().toISOString().split("T")[0],
      };
      onCreateTicket(newTicket);
    }

    setSubject("");
    setDescription("");
    setPriority("Low");
    setStatus("Open");
  };

  const handleClear = () => {
    setSubject("");
    setDescription("");
    setPriority("Low");
    setStatus("Open");
    setError("");
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          placeholder="Enter ticket subject..."
          value={subject}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Describe the issue..."
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPriority(e.target.value as TicketPriority)
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setStatus(e.target.value as TicketStatus)
            }
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="btn-group">
        <button type="button" className="btn clear" onClick={handleClear}>
          Clear
        </button>
        <button type="submit" className="btn create">
          {editingTicket ? "Update Ticket" : "Create Ticket"}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;