import express from "express";
import Message from "../models/Message.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ✅ Configuration du transporteur Brevo (Sendinblue)
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false, // false pour port 587
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

// ✅ Route POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body;

    // Vérification des champs requis
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    // 1️⃣ Enregistrement du message dans MongoDB
    await Message.create({ nom, email, sujet, message });

    // 2️⃣ Envoi d’un e-mail de notification aux destinataires
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.BREVO_USER}>`, // ✅ Utilisation du compte Brevo
      to: ["youssoufmaiga4289@gmail.com", "aakm9389@gmail.com"], // ✅ plusieurs destinataires
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

    // ✅ Réponse à l’utilisateur
    res.status(200).json({
      success: true,
      message: "Message envoyé et notifications transmises ✅",
    });
  } catch (err) {
    console.error("❌ Erreur d’envoi du message :", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur. Vérifie le log Render.",
    });
  }
});

export default router;
