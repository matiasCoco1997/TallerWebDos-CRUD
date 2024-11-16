const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// Configura la conexión
const connection = mysql.createConnection({
  host: "localhost", // nombre servidor bdd
  user: "root", // nombre usuario bdd
  password: "", // nombre contraseña bdd
  database: "task", // nombre  bdd
  port: 3306, //puerto bdd
});

connection.connect((error) => {
  if (error) {
    console.error("Error de conexión: ", error);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Obtener tareas filtradas por estado
app.get("/api/tareas", (req, res) => {
  const { estado } = req.query;

  let query = "SELECT * FROM tarea";
  const queryParams = [];

  if (estado === "activas") {
    query += " WHERE estadoEliminado = 0 AND estadoFinalizado = 0";
  } else if (estado === "eliminadas") {
    query += " WHERE estadoEliminado = 1";
  } else if (estado === "finalizadas") {
    query += " WHERE estadoFinalizado = 1";
  }

  connection.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Error en la consulta: ", error);
      res.status(500).json({ error: "Error al obtener tareas" });
      return;
    }
    res.json(results);
  });
});

// Obtener una tarea por ID
app.get("/api/tareas/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM tarea WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error en la consulta: ", error);
        res.status(500).json({ error: "Error al obtener la tarea" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Tarea no encontrada" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

// Crear una nueva tarea
app.post("/api/crearTarea", (req, res) => {
  const { titulo, descripcion, prioridad } = req.body;
  connection.query(
    "INSERT INTO tarea (titulo, descripcion, prioridad, estadoEliminado, estadoFinalizado) VALUES (?, ?, ?, 0, 0)",
    [titulo, descripcion, prioridad],
    (error, result) => {
      if (error) {
        console.error("Error en la consulta: ", error);
        res.status(500).json({ error: "Error al crear la tarea" });
        return;
      }
      res
        .status(201)
        .json({ id: result.insertId, titulo, descripcion, prioridad });
    }
  );
});

// Actualizar una tarea por ID
app.put("/api/tareas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, prioridad } = req.body;
  connection.query(
    "UPDATE tarea SET titulo = ?, descripcion = ?, prioridad = ? WHERE id = ?",
    [titulo, descripcion, prioridad, id],
    (error) => {
      if (error) {
        console.error("Error en la consulta: ", error);
        res.status(500).json({ error: "Error al actualizar la tarea" });
        return;
      }
      res.json({ message: "Tarea actualizada" });
    }
  );
});

// Marcar tarea como eliminada (estadoEliminado a 1)
app.put("/api/tareas/eliminar/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "UPDATE tarea SET estadoEliminado = 1 WHERE id = ?",
    [id],
    (error) => {
      if (error) {
        console.error("Error al marcar como eliminada la tarea:", error);
        res
          .status(500)
          .json({ error: "Error al marcar como eliminada la tarea" });
        return;
      }
      res.json({ message: "Tarea marcada como eliminada" });
    }
  );
});

// Marcar tarea como finalizada (estadoFinalizado a 1)
app.put("/api/tareas/finalizar/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "UPDATE tarea SET estadoFinalizado = 1 WHERE id = ?",
    [id],
    (error) => {
      if (error) {
        console.error("Error al finalizar la tarea:", error);
        res.status(500).json({ error: "Error al finalizar la tarea" });
        return;
      }
      res.json({ message: "Tarea marcada como finalizada" });
    }
  );
});

// Eliminar una tarea físicamente de la base de datos
app.delete("/api/tareas/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM tarea WHERE id = ?", [id], (error) => {
    if (error) {
      console.error("Error en la consulta: ", error);
      res.status(500).json({ error: "Error al eliminar la tarea" });
      return;
    }
    res.status(204).send();
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
