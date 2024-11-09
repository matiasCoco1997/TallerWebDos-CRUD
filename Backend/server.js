const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

const PORT = 3000;
// Configura la conexión
const connection = mysql.createConnection({
  host: 'localhost',      // Cambia a la dirección de tu servidor si no es local
  user: 'root',     // Usuario de tu base de datos
  password: '', // Contraseña de tu base de datos
  database: 'task',
  port : 3306 // post
});
// Conéctate a la base de datos
connection.connect((error) => {
    if (error) {
      console.error('Error de conexión: ', error);
      return;
    }
    console.log('Conectado a la base de datos MySQL');
  });



  app.get('/api/tareas', (req, res) => {
    connection.query('SELECT * FROM tarea', (error, results) => {
      if (error) {
        console.error('Error en la consulta: ', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
        return;
      }
      res.json(results);
    });
  }); 

// Obtener una tarea por ID
app.get('/api/tareas/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM tarea WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Error en la consulta: ', error);
        res.status(500).json({ error: 'Error al obtener la tarea' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Tarea no encontrada' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Crear una nueva tarea
  app.post('/api/crearTarea', (req, res) => { 
    console.log(req.body);
    const { titulo, descripcion, prioridad } = req.body;
    connection.query(
      'INSERT INTO tarea (titulo, descripcion, prioridad) VALUES (?, ?, ?)',
      [titulo, descripcion, prioridad],
      (error, result) => {
        if (error) {
          console.error('Error en la consulta: ', error);
          res.status(500).json({ error: 'Error al crear la tarea' });
          return;
        }
        res.status(201).json({ id: result.insertId, titulo, descripcion, prioridad });
      }
    );
  });
  
  // Actualizar una tarea por ID
  app.put('/api/tareas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, prioridad } = req.body;
    connection.query(
      'UPDATE tarea SET titulo = ?, descripcion = ?, prioridad = ? WHERE id = ?',
      [titulo, descripcion, prioridad, id],
      (error) => {
        if (error) {
          console.error('Error en la consulta: ', error);
          res.status(500).json({ error: 'Error al actualizar la tarea' });
          return;
        }
        res.json({ message: 'Tarea actualizada' });
      }
    );
  });
  
  // Eliminar una tarea por ID
  app.delete('/api/tareas/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM tarea WHERE id = ?', [id], (error) => {
      if (error) {
        console.error('Error en la consulta: ', error);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
        return;
      }
      res.status(204).send();
    });
  });


 // Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });

