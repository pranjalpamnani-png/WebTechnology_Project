import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TicketListPage from "./pages/TicketListPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import NotFound from "./pages/NotFound";

function AppContent() {
  return (
    <>
      <Header />
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<><Dashboard /><TicketListPage /></>} />
          <Route path="/create" element={<CreateTicketPage />} />
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
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

export default App;
