import express from "express";
import {addUsers, getUsers, getUserById} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.get('/:id', getUserById); 
router.post("/", addUsers);

export default router;