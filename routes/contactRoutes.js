import express from "express";
import Message from "../models/Message.js";
import brevo from "@getbrevo/brevo";

const router = express.Router();

// ✅ Configuration du client Brevo (API HTTP, pas SMTP)
const client = new brevo.TransactionalEmailsApi();
client.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// ✅ Route POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body;

    // Vérification basique des champs
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    // 1️⃣ Enregistrement du message dans MongoDB
    await Message.create({ nom, email, sujet, message });

    // 2️⃣ Envoi d’un e-mail de notification via Brevo API
    await client.sendTransacEmail({
      sender: { email: "youssoufmaiga4289@gmail.com", name: "Portfolio Contact" },
      to: [
        { email: "youssoufmaiga4289@gmail.com" },
        { email: "aakm9389@gmail.com" }
      ],
      subject: `📩 Nouveau message reçu : ${sujet}`,
      textContent: `
Tu as reçu un nouveau message depuis ton site portfolio :
────────────────────────────
👤 Nom : ${nom}
📧 Email : ${email}
📝 Sujet : ${sujet}

💬 Message :
${message}
────────────────────────────
      `,
    });

    res.status(200).json({ success: true, message: "Message envoyé et notification transmise ✅" });
  } catch (err) {
    console.error("❌ Erreur d’envoi du message :", err);
    res.status(500).json({ success: false, error: "Erreur serveur lors de l’envoi du message." });
  }
});

export default router;
