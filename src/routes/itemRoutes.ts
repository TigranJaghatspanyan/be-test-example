import { Router } from "express";
import { createItem } from "../controllers/itemController";

const router = Router();

router.post("/create-item", createItem);

export default router;
