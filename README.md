# 📋 Planificador de Tareas (Task Planner)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Aplicación web interactiva para la gestión y seguimiento de tareas diarias, desarrollada con **Vanilla JavaScript**, **Bootstrap 5** y **HTML5/CSS3**. Cuenta con persistencia de datos mediante **Web Storage API (localStorage)** y una vista interactiva de calendario mensual.

---

##  Características Principales

* **Gestión CRUD Completa**:
  * **Creación**: Registro de tareas con nombre, categoría dinámica (Trabajo, Estudio, Personal o personalizada), descripción, fecha de entrega y nivel de prioridad (Alto, Medio, Bajo).
  * **Lectura**: Presentación en tarjetas responsivas (*cards*) organizadas.
  * **Edición Directa**: Modificación *in-place* de los campos de la tarea directamente desde su tarjeta.
  * **Eliminación**: Remoción individual de tareas manteniendo la consistencia de los identificadores.
  * **Gestión de Estado**: Alternancia entre estados (`Pendiente` / `Realizada`) con actualización visual.
* **Persistencia con Web Storage API**: Integración de métodos `save()` y `load()` en `TaskManager` para almacenar la colección de tareas y la secuencia única de `currentId` en `localStorage`.
* **Filtrado en Tiempo Real**: Filtrado combinado por fecha de entrega, categoría y nivel de prioridad.
* **Modal de Calendario Mensual**: Grilla navegable entre meses que resalta visualmente las fechas con entregas programadas y permite filtrar las tareas al hacer clic en un día.
* **Diseño Responsivo e Interfaz Compacta**: Adaptación a distintas resoluciones con soporte de barra de desplazamiento en el contenedor de tareas.

---

##  Tecnologías Utilizadas

* **HTML5**: Estructura semántica del documento.
* **CSS3**: Estilos personalizados estructurados con **Design Tokens** e integración de Bootstrap Icons.
* **Bootstrap 5.3**: Maquetación Grid responsiva, tarjetas y componentes modales.
* **JavaScript (ES6+)**: Programación Orientada a Objetos (POO) modular con la clase `TaskManager`, manipulación del DOM y consumo de LocalStorage.

---
## Enlaces del Proyecto

* **Trello:** https://trello.com/invite/b/6a46a0a13678f5309f5b3982/ATTIa42f6ad5645a644c7dc00e8ed54512853D88F71F/ind-project
* **Figma:** https://www.figma.com/design/MJhuXDGMFaF9Hcr4FjGIxa/Poryecto-Ind.?node-id=0-1&t=qb7PxWPln31q1x7z-1


## Deploy del Proyecto
Puedes acceder a la versión desplegada en vivo de la aplicación en el siguiente enlace:

👉 Ver Aplicación en Vivo
* **Demo (GitHub Pages):** https://sebastiancruzmendez.github.io/Sebastian_Cruz_Proyecto_Individual/
---

##  Estructura del Proyecto

```text
Planificador-Tareas/
├── css/
│   └── style.css          # Hojas de estilo personalizadas (Design Tokens)
├── js/
│   ├── taskManager.js     # Clase TaskManager y lógica de renderizado
│   └── index.js           # Manejo de eventos del DOM e interactividad
├── img/
│   └── fondo1.jpg         # Imagen de fondo temática
├── index.html             # Interfaz principal de la aplicación
└── README.md              # Documentación del proyecto

---


