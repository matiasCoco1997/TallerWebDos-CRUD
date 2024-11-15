Gestor de Tareas
Este proyecto es un gestor de tareas desarrollado como parte de la materia Taller Web II de la carrera TECNICATURA EN DESARROLLO WEB de la Universidad Nacional de La Matanza. Permite crear, listar, actualizar y eliminar tareas. El frontend está desarrollado con Angular, mientras que el backend utiliza Node.js y Express para conectarse a una base de datos MySQL.

Desarrolladores
Matías Coco
Nicolás Piedrabuena
Victoria Gambaro


Tecnologías utilizadas
Frontend: Angular, TypeScript, HTML, CSS
Backend: Node.js, Express
Base de datos: MySQL


Estructura del proyecto
Backend: Contiene la lógica del servidor, incluyendo la configuración de la base de datos, los controladores de tareas, y las rutas de la API.
Frontend (gestorDeTareas): Contiene el código de Angular para la interfaz de usuario y los componentes relacionados con la gestión de tareas.

Configuración y uso

Requisitos previos
Asegúrate de tener instalados Node.js y MySQL en tu sistema.

Instalación
Clona el repositorio:

bash
Copiar código
git clone https://github.com/matiasCoco1997/TallerWebDos-CRUD.git
cd TallerWebDos-CRUD

Configura la base de datos MySQL:
Crea una base de datos llamada task y ejecuta el siguiente script para crear la tabla tarea:

sql
CREATE TABLE `tarea` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `prioridad` varchar(20) DEFAULT NULL,
  `estadoEliminado` tinyint(1) DEFAULT 0,
  `estadoFinalizado` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


Configura el archivo db.js:
En la carpeta Backend, personaliza según tus credenciales de MySQL.

Iniciar BACKEND:
Los comandos para iniciar el BACKEND en el bash son
cd Backend
npm install (solo la primera vez)
npm start
Esto iniciará el servidor en http://localhost:3000.

Iniciar FRONTEND
Instala las dependencias del frontend en el bash:
cd ../Frontend/gestorDeTareas
npm install

Ejecuta la aplicación Angular:
ng serve --port 3001
La aplicación estará disponible en http://localhost:3001.

Funcionalidad:
Crear tarea: Agrega una nueva tarea con título, descripción y prioridad.
Listar tareas: Muestra todas las tareas activas, eliminadas o finalizadas según el filtro seleccionado.
Actualizar tarea: Permite editar los detalles de una tarea específica.
Eliminar tarea: Marca una tarea como eliminada (sin eliminarla físicamente de la base de datos).
Finalizar tarea: Cambia el estado de una tarea a "finalizada".

Notas adicionales
Este proyecto está diseñado para aprender y aplicar conceptos de desarrollo web en el contexto de un CRUD. No se recomienda para producción sin modificaciones adicionales de seguridad y optimización.

