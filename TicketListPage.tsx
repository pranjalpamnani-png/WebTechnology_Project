import type { Ticket } from "../types/ticket";
import TicketCard from "../components/TicketCard";

type TicketListPageProps = {
  tickets: Ticket[];
  onDelete: (id: number) => void;
  onEdit: (ticket: Ticket) => void;
};

const TicketListPage = ({
  tickets,
  onDelete,
  onEdit,
}: TicketListPageProps) => {
  const high = tickets.filter((t) => t.priority === "High").length;
  const medium = tickets.filter((t) => t.priority === "Medium").length;
  const low = tickets.filter((t) => t.priority === "Low").length;

  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;
  const closed = tickets.filter((t) => t.status === "Closed").length;

  return (
    <div className="page">

      {/* Dashboard Heading */}
      <h2 style={{ marginBottom: "20px", color: "#233876" }}>
        Dashboard
      </h2>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "14px",
          marginBottom: "30px",
        }}
      >
        <DashboardCard title="Total Tickets" value={tickets.length} />
        <DashboardCard title="High Priority" value={high} />
        <DashboardCard title="Medium Priority" value={medium} />
        <DashboardCard title="Low Priority" value={low} />
        <DashboardCard title="Status Open" value={open} />
        <DashboardCard title="Status In Progress" value={inProgress} />
        <DashboardCard title="Status Closed" value={closed} />
      </div>

      <div className="page-title">
        <h2>Ticket List</h2>
        <p className="muted">
          {tickets.length} ticket
          {tickets.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="ticket-list">
        {tickets.length === 0 ? (
          <div className="empty-state">
            <p>
              No tickets yet. <a href="/create">Create one!</a>
            </p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

type CardProps = {
  title: string;
  value: number;
};

const DashboardCard = ({ title, value }: CardProps) => (
  <div
    style={{
      background: "#fff",
      border: "1px solid #dfe3f0",
      borderRadius: "12px",
      padding: "18px",
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}
  >
    <h4 style={{ margin: 0, color: "#666", fontSize: "14px" }}>
      {title}
    </h4>

    <h2
      style={{
        margin: "10px 0 0",
        color: "#233876",
      }}
    >
      {value}
    </h2>
  </div>
);

export default TicketListPage;