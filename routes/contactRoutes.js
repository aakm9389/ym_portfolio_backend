import express from "express";
import { sendMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", sendMessage); // ✅ route pour envoyer un message

router.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l’API contact ✅" });
});

export default router;
