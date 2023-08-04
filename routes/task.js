import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/tasks/new", isAuthenticated, newTask);

router.get("/tasks/me", isAuthenticated, getMyTask);

router.route("/tasks/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);


export default router;  