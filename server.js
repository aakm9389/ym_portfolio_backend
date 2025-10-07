import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// ✅ Sécurité : Helmet pour protéger les en-têtes HTTP
app.use(helmet());

// ✅ Limitation du nombre de requêtes (100 req / 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Trop de requêtes depuis cette IP, réessayez plus tard."
});
app.use(limiter);

// ✅ CORS : Autoriser uniquement ton frontend Angular
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Pour lire le JSON
app.use(express.json());

// ✅ Routes
app.use("/api/contact", contactRoutes);

// ✅ Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err.message));

// ✅ Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur sécurisé sur le port ${PORT}`));
