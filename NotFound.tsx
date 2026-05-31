import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "72px", margin: 0, color: "#233876" }}>404</h1>
      <h2 style={{ color: "#374151", marginTop: "8px" }}>Page Not Found</h2>
      <p style={{ color: "#6b7280", maxWidth: "400px", margin: "12px 0 24px" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" style={{ background: "#233876", color: "#fff", padding: "10px 24px",
        borderRadius: "8px", textDecoration: "none", fontWeight: 500 }}>
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;