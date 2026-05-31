import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tickets", ticketRoutes);

// Unknown API routes
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

export default app;