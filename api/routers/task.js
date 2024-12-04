import express from "express";
import {getTask, addTask, deleteTask, updateTask} from "../controllers/task.js";

const router = express.Router();

router.get("/task", getTask);

router.post("/task", addTask);

// Rota para deletar uma tarefa pelo id
router.delete('/task/:id', deleteTask);

// Rota para atualizar uma tarefa pelo id
router.put('/task/:id', updateTask);

export default router;