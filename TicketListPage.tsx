import { useEffect, useState } from "react";
import type { Ticket } from "../types/ticket";
import TicketCard from "../components/TicketCard";

const TicketListPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:5000/tickets");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setTickets(data);
    } catch {
      setError("Could not load tickets. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/tickets/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete ticket. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="page-title">
        <h2>Ticket List</h2>
        <p className="muted">{tickets.length} ticket{tickets.length !== 1 ? "s" : ""} found</p>
      </div>

      {loading && <p style={{ color: "#666", fontStyle: "italic" }}>Loading tickets...</p>}
      {error   && <p style={{ color: "#ef4444" }}>{error}</p>}

      <div className="ticket-list">
        {!loading && !error && tickets.length === 0 ? (
          <div className="empty-state">
            <p>No tickets yet. <a href="/create">Create one!</a></p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default TicketListPage;