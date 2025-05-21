import express from "express";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRouter.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
