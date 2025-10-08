import express from "express";
import { sendMessage } from "../controllers/contactController.js";

const router = express.Router();

// Route principale de contact
router.post("/", sendMessage);

// (Optionnel) Route de test GET
router.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l’API contact ✅" });
});

export default router;
