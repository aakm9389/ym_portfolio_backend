// backend/models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  sujet: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Message", messageSchema);
