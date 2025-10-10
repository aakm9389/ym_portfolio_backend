import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS correctement configuré
app.use(cors({
  origin: [
    "http://localhost:4200",
    "https://ymaigaportfolio.netlify.app"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Pour gérer les requêtes pré-flight OPTIONS
app.options(/.*/, cors());


// Middleware
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API du portfolio de Youssouf est en ligne ✅");
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Lancer le serveur
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
