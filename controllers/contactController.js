import Message from "../models/Message.js"; // ✅ ton modèle existant

// ✅ Contrôleur pour traiter les messages du formulaire
export const sendMessage = async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body;

    // Validation basique
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    // Enregistrement dans MongoDB via ton modèle Message
    const nouveauMessage = new Message({ nom, email, sujet, message });
    await nouveauMessage.save();

    res.status(201).json({ message: "Message enregistré avec succès !" });
  } catch (err) {
    console.error("❌ Erreur lors de l’envoi du message :", err);
    res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
  }
};
