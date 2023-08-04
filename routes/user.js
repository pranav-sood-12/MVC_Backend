import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, getMyDetails, register ,login ,logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/users/all", getAllUsers)

router.post("/users/new",register)
router.get("/users/login",login)
router.get("/users/logout",logout)


router.get("/users/me" ,isAuthenticated, getMyDetails)

export default router;