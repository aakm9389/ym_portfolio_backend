// backend/controllers/contactController.js
import Message from "../models/Message.js";

// POST /api/contact
export const envoyerMessage = async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body;

    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ success: false, error: "Tous les champs sont obligatoires." });
    }

    const nouveauMessage = new Message({ nom, email, sujet, message });
    await nouveauMessage.save();

    res.status(201).json({ success: true, message: "Message envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l’envoi du message :", error);
    res.status(500).json({ success: false, error: "Erreur interne du serveur." });
  }
};

// ✅ GET /api/contact/messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 }); // du plus récent au plus ancien
    res.status(200).json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
