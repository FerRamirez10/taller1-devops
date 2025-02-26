import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [nombre, setNombre] = useState("");
  const [nombres, setNombres] = useState([]);
  const [mensaje, setMensaje] = useState(""); // Estado para mensajes de éxito o error

  // Obtener nombres guardados
  const fetchNombres = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener nombres");
      const data = await response.json();
      setNombres(data);
    } catch (error) {
      console.error(error);
      setMensaje("⚠️ No se pudieron cargar los nombres.");
    }
  };

  // Guardar un nuevo nombre
  const saveNombre = async () => {
    if (!nombre.trim()) {
      setMensaje("⚠️ El nombre no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }), // Se envía como { "nombre": "diego" }
      });

      if (!response.ok) throw new Error("Error al guardar el nombre");

      setNombre("");
      setMensaje("✅ Nombre guardado con éxito.");
      fetchNombres(); // Actualizar lista después de guardar
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al guardar el nombre.");
    }
  };

  // Cargar nombres al iniciar
  useEffect(() => {
    fetchNombres();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Nombres</h1>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <div className="input-container">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa un nombre"
        />
        <button onClick={saveNombre}>Guardar</button>
      </div>
      <ul className="name-list">
        {nombres.map((item, index) => (
          <li key={index}>{item.nombre}</li> // Ahora muestra "nombre" en lugar de "name"
        ))}
      </ul>
    </div>
  );
}

export default App;