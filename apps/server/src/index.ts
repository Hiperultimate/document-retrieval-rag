import express, { Express } from "express";
import healthRoute from "./routes/health";

const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use("/health-check", healthRoute);

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});

export default app;
