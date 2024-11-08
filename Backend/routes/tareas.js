const mysql = require('mysql2');
 
// Configura la conexión
const connection = mysql.createConnection({
  host: 'localhost',      // Cambia a la dirección de tu servidor si no es local
  user: 'tu_usuario',     // Usuario de tu base de datos
  password: 'tu_contraseña', // Contraseña de tu base de datos
  database: 'nombre_de_tu_bd' // Nombre de tu base de datos
});
 
// Conéctate a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error de conexión: ', error);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});


// Crear una nueva tarea
// router.post('/tareas', async (req, res) => {
//   const { titulo, descripcion } = req.body;
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO tareas (titulo, descripcion, completada) VALUES (?, ?, ?)',
//       [titulo, descripcion, false]
//     );
//     res.status(201).json({ id: result.insertId, titulo, descripcion, completada: false });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al crear la tarea' });
//   }
// });

// Obtener todas las tareas
connection.query('SELECT * FROM tu_tabla', (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      return;
    }
    console.log('Resultados: ', results);
  });
   
  // Cierra la conexión cuando termines
  connection.end();
  });
   

// // Actualizar una tarea por ID
// router.put('/tareas/:id', async (req, res) => {
//   const { id } = req.params;
//   const { titulo, descripcion, completada } = req.body;
//   try {
//     await pool.query(
//       'UPDATE tareas SET titulo = ?, descripcion = ?, completada = ? WHERE id = ?',
//       [titulo, descripcion, completada, id]
//     );
//     res.json({ message: 'Tarea actualizada' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar la tarea' });
//   }
// });

// // Eliminar una tarea por ID
// router.delete('/tareas/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM tareas WHERE id = ?', [id]);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar la tarea' });
//   }
// });

module.exports = router;
