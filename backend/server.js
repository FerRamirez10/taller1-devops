import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Tomar la URL desde .env

// Conectar a MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error de conexión:", error));

// Definir el esquema y modelo de Nombre
const nombreSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
});

const Nombre = mongoose.model("Nombre", nombreSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Obtener todos los nombres
app.get("/nombres", async (req, res) => {
  try {
    const nombres = await Nombre.find();
    res.json(nombres);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener nombres" });
  }
});

// Guardar un nuevo nombre
app.post("/nombres", async (req, res) => {
  try {
    const nuevoNombre = new Nombre({ nombre: req.body.nombre });
    await nuevoNombre.save();
    res.status(201).json({ message: "Nombre guardado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el nombre" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor ejecutandose en puerto ${PORT}`);
});