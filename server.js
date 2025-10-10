import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();


import nodemailer from "nodemailer";

// ✅ Configuration du transport (ici avec Gmail, tu peux adapter à Yahoo)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // ton e-mail d’envoi
    pass: process.env.EMAIL_PASS, // ton mot de passe ou App Password
  },
});



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
