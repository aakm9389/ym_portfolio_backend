import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
//OK
// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:4200", "https://youssoufmaigaportfolio.netlify.app/"], // ← tu remplaceras ici ton URL Netlify
}));

// Routes
app.use("/api/contact", contactRoutes);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("API du portfolio de Youssouf est en ligne ✅");
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
