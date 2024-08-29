import { Router } from "express";
import { createUser, getUsers, login } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", login);

export default router;
