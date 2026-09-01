const taskManager = new TaskManager();

taskManager.load();
taskManager.render();

const newTaskForm = document.querySelector('#taskForm');
const alertError = document.querySelector('#alertError');
const alertMessage = document.querySelector('#alertMessage');
const taskList = document.querySelector('#taskList');

newTaskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const nameInput = document.querySelector('#newTaskNameInput');
  const descriptionInput = document.querySelector('#newTaskDescription');
  const dueDateInput = document.querySelector('#newTaskDueDate');

  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;

  if (name === '' || description === '' || dueDate === '') {
    mostrarAlerta('Por favor, completa todos los campos requeridos.');
    return;
  }

  alertError.classList.add('d-none');

  taskManager.addTask(name, description, dueDate);
  taskManager.save();
  taskManager.render();

  newTaskForm.reset();
});

taskList.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-button') || event.target.closest('.delete-button')) {
    const parentTask = event.target.closest('[data-task-id]');
    const taskId = Number(parentTask.dataset.taskId);

    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
  }

  if (event.target.classList.contains('toggle-button') || event.target.closest('.toggle-button')) {
    const parentTask = event.target.closest('[data-task-id]');
    const taskId = Number(parentTask.dataset.taskId);

    const task = taskManager.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = (task.status === 'Completada') ? 'PORHACER' : 'Completada';
      taskManager.save();
      taskManager.render();
    }
  }
});

function mostrarAlerta(mensaje) {
  alertMessage.textContent = mensaje;
  alertError.classList.remove('d-none');
}