function createTaskHtml(id, name, description, dueDate, status) {
  const isCompleted = status === 'Completada';
  const cardBgClass = isCompleted ? 'bg-light border-success opacity-75' : '';
  const textStyle = isCompleted ? 'text-decoration-line-through text-muted' : '';
  const toggleBtnClass = isCompleted ? 'btn-success' : 'btn-outline-success';
  const toggleBtnIcon = isCompleted ? 'bi-check-circle-fill' : 'bi-circle';
  const toggleBtnText = isCompleted ? 'Completada' : 'Marcar Completada';

  return `
    <div class="col-12 mb-3" data-task-id="${id}">
      <div class="card border shadow-sm ${cardBgClass}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h3 class="h6 card-title mb-0 fw-bold ${textStyle}">${name}</h3>
            <span class="badge bg-secondary">${status}</span>
          </div>
          <p class="card-text text-muted small mb-3 ${textStyle}">${description}</p>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top">
            <small class="text-secondary"><i class="bi bi-calendar-event me-1"></i>${dueDate}</small>
            <div class="btn-group">
              <button class="toggle-button btn btn-sm ${toggleBtnClass}">
                <i class="bi ${toggleBtnIcon} me-1"></i>${toggleBtnText}
              </button>
              <!-- Botón de eliminar con la clase delete-button requerida -->
              <button class="delete-button btn btn-sm btn-outline-danger">
                <i class="bi bi-trash me-1"></i>Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, dueDate, status = 'Por Hacer') {
    this.currentId++;
    const task = {
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: status
    };
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    const newTasks = [];
    for (let task of this.tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }

  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);

    const currentIdJson = JSON.stringify(this.currentId);
    localStorage.setItem('currentId', currentIdJson);
  }

  load() {
    if (localStorage.getItem('tasks')) {
      const tasksJson = localStorage.getItem('tasks');
      this.tasks = JSON.parse(tasksJson);
    }
    if (localStorage.getItem('currentId')) {
      const currentIdJson = localStorage.getItem('currentId');
      this.currentId = Number(JSON.parse(currentIdJson));
    }
  }

  render() {
    const tasksHtmlList = [];
    for (let task of this.tasks) {
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.dueDate,
        task.status
      );
      tasksHtmlList.push(taskHtml);
    }

    const taskList = document.querySelector('#taskList');
    const taskCounter = document.querySelector('#taskCounter');

    if (taskList) {
      taskList.innerHTML = tasksHtmlList.join('\n');
    }
    if (taskCounter) {
      taskCounter.textContent = `${this.tasks.length} Tareas registradas`;
    }
  }
}