import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import TicketListPage from "./pages/TicketListPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import NotFound from "./pages/NotFound";

import type { Ticket } from "./types/ticket";
import mockTickets from "./data/mockTickets";

function AppContent() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const navigate = useNavigate();

  const handleCreateTicket = (ticket: Ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  const handleDeleteTicket = (id: number) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket);
    navigate("/create");
  };

  const handleUpdateTicket = (updated: Ticket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );

    setEditingTicket(null);
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <TicketListPage
                tickets={tickets}
                onDelete={handleDeleteTicket}
                onEdit={handleEditTicket}
              />
            }
          />

          <Route
            path="/create"
            element={
              <CreateTicketPage
                onCreateTicket={handleCreateTicket}
                onUpdateTicket={handleUpdateTicket}
                editingTicket={editingTicket}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2026 MiniHelpDesk — CS4717 Web Technologies</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;