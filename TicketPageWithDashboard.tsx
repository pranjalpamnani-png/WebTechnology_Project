import type { Ticket } from "../types/ticket";
import TicketListPage from "./TicketListPage";
import Dashboard from "../components/Dashboard";

type Props = {
  tickets: Ticket[];
  onDelete: (id: number) => void;
  onEdit: (ticket: Ticket) => void;
};

const TicketDashboardPage = ({ tickets, onDelete, onEdit }: Props) => {
  return (
    <div>
      <Dashboard tickets={tickets} />

      <TicketListPage
        tickets={tickets}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default TicketDashboardPage;