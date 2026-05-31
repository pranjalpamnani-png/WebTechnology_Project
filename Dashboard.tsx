import type { Ticket } from "../types/ticket";
import "../styles/dashboard.css";

type DashboardProps = {
  tickets: Ticket[];
};

const Dashboard = ({ tickets }: DashboardProps) => {
  const total = tickets.length;

  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const closed = tickets.filter((t) => t.status === "Closed").length;

  const high = tickets.filter((t) => t.priority === "High").length;
  const medium = tickets.filter((t) => t.priority === "Medium").length;
  const low = tickets.filter((t) => t.priority === "Low").length;

  return (
    <div className="hd-container">
      <h2 className="hd-title">Dashboard Overview</h2>

      <div className="hd-grid">

        <div className="hd-card total">
          <h3>Total Tickets</h3>
          <p>{total}</p>
        </div>

        <div className="hd-card open">
          <h3>Open</h3>
          <p>{open}</p>
        </div>

        <div className="hd-card progress">
          <h3>In Progress</h3>
          <p>{inProgress}</p>
        </div>

        <div className="hd-card closed">
          <h3>Closed</h3>
          <p>{closed}</p>
        </div>

        <div className="hd-card high">
          <h3>High Priority</h3>
          <p>{high}</p>
        </div>

        <div className="hd-card medium">
          <h3>Medium Priority</h3>
          <p>{medium}</p>
        </div>

        <div className="hd-card low">
          <h3>Low Priority</h3>
          <p>{low}</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;