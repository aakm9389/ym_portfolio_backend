import express from "express";
import Message from "../models/Message.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ✅ Configuration Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Ton Gmail d'envoi
    pass: process.env.EMAIL_PASS, // Mot de passe d’application
  },
});

// ✅ Route POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body;

    // Vérification des champs
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    // 1️⃣ Enregistrement du message dans MongoDB
    await Message.create({ nom, email, sujet, message });

    // 2️⃣ Envoi d’un e-mail de notification aux deux destinataires
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: ["youssoufmaiga4289@gmail.com", "aakm9389@gmail.com"], // 👈 plusieurs destinataires
      subject: `📩 Nouveau message reçu : ${sujet}`,
      text: `
Tu as reçu un nouveau message depuis ton site portfolio :
────────────────────────────
Nom : ${nom}
Email : ${email}
Sujet : ${sujet}

Message :
${message}
────────────────────────────
      `,
    });

    res.status(200).json({ success: true, message: "Message envoyé et notifications transmises ✅" });
  } catch (err) {
    console.error("❌ Erreur d’envoi du message :", err);
    res.status(500).json({ success: false, error: "Erreur serveur. Vérifie le log Render." });
  }
});

export default router;
