import express from "express";
import userRoutes from "../api/routers/user.js";
import taskRoutes from "../api/routers/task.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRoutes);
app.use("/task", taskRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
