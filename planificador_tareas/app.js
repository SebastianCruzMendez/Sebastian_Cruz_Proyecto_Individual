let tasks = [
];

const taskForm = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');
const taskCounter = document.querySelector('#taskCounter');
const alertError = document.querySelector('#alertError');
const alertMessage = document.querySelector('#alertMessage');

const filterDate = document.querySelector('#filterDate');
const filterCategory = document.querySelector('#filterCategory');
const filterStatus = document.querySelector('#filterStatus');

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newTaskNameInput = document.querySelector('#newTaskNameInput');
  const newTaskCategory = document.querySelector('#newTaskCategory');
  const newTaskDescription = document.querySelector('#newTaskDescription');
  const newTaskDueDate = document.querySelector('#newTaskDueDate');
  const newTaskStatus = document.querySelector('#newTaskStatus');

  const formData = {
    name: newTaskNameInput.value.trim(),
    category: newTaskCategory.value,
    description: newTaskDescription.value.trim(),
    dueDate: newTaskDueDate.value,
    status: newTaskStatus.value
  };

  if (validFormFieldInput(formData)) {
    alertError.classList.add('d-none');

    const newTask = {
      id: Date.now(),
      ...formData
    };
    tasks.unshift(newTask);

    renderTasks();
    taskForm.reset();
  }
});

function validFormFieldInput(data) {
  if (data.name === '') {
    mostrarAlerta('El nombre de la tarea no puede estar vacío.');
    return false;
  }
  if (data.category === '') {
    mostrarAlerta('Debes seleccionar una categoría.');
    return false;
  }
  if (data.description === '') {
    mostrarAlerta('La descripción no puede estar vacía.');
    return false;
  }
  if (data.dueDate === '') {
    mostrarAlerta('Debes seleccionar una fecha de entrega.');
    return false;
  }
  if (data.status === '') {
    mostrarAlerta('Debes seleccionar un estado para la tarea.');
    return false;
  }
  return true;
}

function mostrarAlerta(mensaje) {
  alertMessage.textContent = mensaje;
  alertError.classList.remove('d-none');
}

function getStatusBadge(status) {
  switch (status) {
    case 'Completada':
      return '<span class="badge bg-success"><i class="bi bi-check-circle me-1"></i>Completada</span>';
    case 'En Proceso':
      return '<span class="badge bg-warning text-dark"><i class="bi bi-clock me-1"></i>En Proceso</span>';
    default:
      return '<span class="badge bg-danger"><i class="bi bi-exclamation-circle me-1"></i>Pendiente</span>';
  }
}

function renderTasks() {
  const selectedDate = filterDate.value;
  const selectedCategory = filterCategory.value;
  const selectedStatus = filterStatus.value;

  const filteredTasks = tasks.filter(task => {
    const matchesDate = !selectedDate || task.dueDate === selectedDate;
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    return matchesDate && matchesCategory && matchesStatus;
  });

  taskList.innerHTML = '';

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <div class="col-12 text-center py-4 text-muted">
        <i class="bi bi-inbox fs-1 d-block mb-2"></i>
        No hay tareas que coincidan con los criterios.
      </div>`;
  } else {
    filteredTasks.forEach(task => {
      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = `
        <div class="card border shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h3 class="h6 card-title mb-0 fw-bold">${task.name}</h3>
              <span class="badge bg-light text-body border">${task.category}</span>
            </div>
            <p class="card-text text-muted small mb-3">${task.description}</p>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top">
              <div>
                ${getStatusBadge(task.status)}
                <small class="text-secondary ms-2"><i class="bi bi-calendar-event me-1"></i>${task.dueDate}</small>
              </div>
              <button onclick="deleteTask(${task.id})" class="btn btn-sm btn-outline-danger" title="Eliminar">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      taskList.appendChild(col);
    });
  }

  taskCounter.textContent = `${filteredTasks.length} Tareas mostradas`;
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

filterDate.addEventListener('change', renderTasks);
filterCategory.addEventListener('change', renderTasks);
filterStatus.addEventListener('change', renderTasks);

renderTasks();