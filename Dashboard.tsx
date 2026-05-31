import { useEffect, useState } from "react";
import "../styles/dashboard.css";

type Stats = {
  totalTickets: number;
  highPriority: number;
  inProgress: number;
  closed: number;
  open: number;
};

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/tickets/stats");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setStats(data);
      } catch {
        setError("Could not load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="hd-loading">Loading dashboard...</p>;
  if (error)   return <p className="hd-error">{error}</p>;

  return (
    <div className="hd-container">
      <h2 className="hd-title">Dashboard Overview</h2>
      <div className="hd-grid">
        <div className="hd-card total">    <h3>Total Tickets</h3> <p>{stats?.totalTickets}</p> </div>
        <div className="hd-card open">     <h3>Open</h3>          <p>{stats?.open}</p>         </div>
        <div className="hd-card progress"> <h3>In Progress</h3>   <p>{stats?.inProgress}</p>   </div>
        <div className="hd-card closed">   <h3>Closed</h3>        <p>{stats?.closed}</p>        </div>
        <div className="hd-card high">     <h3>High Priority</h3> <p>{stats?.highPriority}</p>  </div>
      </div>
    </div>
  );
};

export default Dashboard;