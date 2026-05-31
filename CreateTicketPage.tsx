import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TicketPriority, TicketStatus } from "../types/ticket";

const CreateTicketPage = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Low");
  const [status, setStatus] = useState<TicketStatus>("Open");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim())     { setError("Subject is required.");     return; }
    if (!description.trim()) { setError("Description is required."); return; }

    setError("");
    setSaving(true);

    try {
      const res = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, description, priority, status }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to create ticket.");
        return;
      }

      navigate("/");
    } catch {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    setSubject(""); setDescription(""); setPriority("Low"); setStatus("Open"); setError("");
  };

  return (
    <div className="page">
      <div className="page-title">
        <h2>Create New Ticket</h2>
        <p className="muted">Fill in the form below to submit a new support ticket.</p>
      </div>

      <div className="form-card">
        <form className="ticket-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input id="subject" type="text" placeholder="Enter ticket subject..."
              value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Describe the issue..."
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value as TicketStatus)}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="btn-group">
            <button type="button" className="btn clear" onClick={handleClear}>Clear</button>
            <button type="submit" className="btn create" disabled={saving}>
              {saving ? "Saving..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketPage;