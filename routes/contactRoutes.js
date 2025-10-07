// backend/routes/contactRoutes.js
import express from "express";
import { envoyerMessage, getMessages } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", envoyerMessage);
router.get("/messages", getMessages); // ✅ nouvelle route

export default router;
