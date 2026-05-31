import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
        Tickets
      </NavLink>
      <NavLink to="/create" className={({ isActive }) => isActive ? "active" : ""}>
        New Ticket
      </NavLink>
    </nav>
  );
};

export default Navbar;