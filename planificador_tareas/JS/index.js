// 1. Instancia de TaskManager y verificación en consola (Exigencia Parte 1)
const taskManager = new TaskManager();
console.log(taskManager.tasks); // Imprime [] en la consola de desarrollador

// 2. Función de interacción para marcar/desmarcar tarea como completada (Exigencia Parte 2)
function toggleTaskStatus(button) {
  // Obtener la tarjeta (card) contenedora del botón
  const card = button.closest('.card');
  const taskTitle = card.querySelector('.card-title');
  const taskDescription = card.querySelector('.card-text');

  // Alternar clases visuales de Bootstrap y estilos
  card.classList.toggle('bg-light');
  card.classList.toggle('border-success');
  card.classList.toggle('opacity-75');

  taskTitle.classList.toggle('text-decoration-line-through');
  taskTitle.classList.toggle('text-muted');

  taskDescription.classList.toggle('text-decoration-line-through');
  taskDescription.classList.toggle('text-muted');

  // Cambiar apariencia e ícono del botón (Toggle)
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