// Instancia global de TaskManager
const taskManager = new TaskManager();

// Elementos del DOM
const newTaskForm = document.querySelector('#taskForm'); // Asegúrate que tu <form> en HTML tenga id="taskForm" o id="newTaskForm"
const alertError = document.querySelector('#alertError');
const alertMessage = document.querySelector('#alertMessage');

// Escuchar el evento submit del formulario
newTaskForm.addEventListener('submit', function (event) {
  // Prevenir que la página se recargue
  event.preventDefault();

  // Recuperar los elementos de entrada
  const nameInput = document.querySelector('#newTaskNameInput');
  const descriptionInput = document.querySelector('#newTaskDescription');
  const dueDateInput = document.querySelector('#newTaskDueDate');

  // Obtener y limpiar los valores
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;

  // Validación de campos
  if (name === '' || description === '' || dueDate === '') {
    mostrarAlerta('Por favor, completa todos los campos requeridos.');
    return;
  }

  // Si la validación es exitosa, ocultar alertas previas
  alertError.classList.add('d-none');

  // Registrar la tarea en TaskManager usando el método addTask()
  taskManager.addTask(name, description, dueDate);

  // Verificar en la consola el estado de las tareas
  console.log('Tarea agregada con éxito. Colección actual:', taskManager.tasks);

  // Limpiar el formulario
  newTaskForm.reset();
});

// Función auxiliar para mostrar mensaje de error
function mostrarAlerta(mensaje) {
  alertMessage.textContent = mensaje;
  alertError.classList.remove('d-none');
}

// Función de interacción visual (conservada de la Tarea 4)
function toggleTaskStatus(button) {
  const card = button.closest('.card');
  const taskTitle = card.querySelector('.card-title');
  const taskDescription = card.querySelector('.card-text');

  card.classList.toggle('bg-light');
  card.classList.toggle('border-success');
  card.classList.toggle('opacity-75');

  taskTitle.classList.toggle('text-decoration-line-through');
  taskTitle.classList.toggle('text-muted');

  taskDescription.classList.toggle('text-decoration-line-through');
  taskDescription.classList.toggle('text-muted');

  if (button.classList.contains('btn-outline-success')) {
    button.classList.remove('btn-outline-success');
    button.classList.add('btn-success');
    button.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Completada';
  } else {
    button.classList.remove('btn-success');
    button.classList.add('btn-outline-success');
    button.innerHTML = '<i class="bi bi-circle me-1"></i>Marcar Completada';
  }
}