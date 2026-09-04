function createTaskHtml(id, name, category, description, dueDate, priority, status, isEditing = false) {
  const isDone = status === 'Realizada' || status === 'DONE' || status === 'Completada';
  const cardBgClass = isDone ? 'bg-light border-success opacity-75' : '';
  const textStyle = isDone ? 'text-decoration-line-through text-muted' : '';
  const doneBtnClass = isDone ? 'btn-success' : 'btn-outline-success';
  const doneBtnText = isDone ? 'Realizada' : 'Marcar como realizada';

  let priorityBadgeClass = 'bg-secondary';
  if (priority === 'Alto') priorityBadgeClass = 'bg-danger';
  if (priority === 'Medio') priorityBadgeClass = 'bg-warning text-dark';
  if (priority === 'Bajo') priorityBadgeClass = 'bg-info text-dark';

  if (isEditing) {
    return `
      <div class="col-12 mb-3" data-task-id="${id}">
        <div class="card border border-warning shadow-sm">
          <div class="card-body">
            <div class="mb-2">
              <label class="form-label small fw-bold">Nombre:</label>
              <input type="text" class="form-control form-control-sm edit-name-input" value="${name}">
            </div>
            <div class="mb-2">
              <label class="form-label small fw-bold">Categoría:</label>
              <input type="text" class="form-control form-control-sm edit-category-input" value="${category}">
            </div>
            <div class="mb-2">
              <label class="form-label small fw-bold">Descripción:</label>
              <textarea class="form-control form-control-sm edit-desc-input" rows="2">${description}</textarea>
            </div>
            <div class="mb-3">
              <label class="form-label small fw-bold">Fecha de entrega:</label>
              <input type="date" class="form-control form-control-sm edit-date-input" value="${dueDate}">
            </div>
            <div class="d-flex justify-content-end gap-2">
              <button class="cancel-button btn btn-sm btn-outline-secondary">Cancelar</button>
              <button class="save-button btn btn-sm btn-success">
                <i class="bi bi-check-lg me-1"></i>Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="col-12 mb-3" data-task-id="${id}">
      <div class="card border shadow-sm ${cardBgClass}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h3 class="h6 card-title mb-0 fw-bold ${textStyle}">${name}</h3>
              <span class="badge bg-light text-dark border mt-1">${category}</span>
            </div>
            <span class="badge ${priorityBadgeClass}">Prioridad: ${priority}</span>
          </div>
          <p class="card-text text-muted small mb-3 ${textStyle}">${description}</p>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top">
            <small class="text-secondary"><i class="bi bi-calendar-event me-1"></i>${dueDate}</small>
            <div class="btn-group">
              <button class="done-button btn btn-sm ${doneBtnClass}">
                <i class="bi ${isDone ? 'bi-check-circle-fill' : 'bi-circle'} me-1"></i>${doneBtnText}
              </button>
              <button class="edit-button btn btn-sm btn-outline-primary">
                <i class="bi bi-pencil me-1"></i>Editar
              </button>
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
    this.currentCalendarDate = new Date();
  }

  addTask(name, category, description, dueDate, priority, status = 'Pendiente') {
    this.currentId++;
    const task = {
      id: this.currentId,
      name: name,
      category: category,
      description: description,
      dueDate: dueDate,
      priority: priority,
      status: status,
      isEditing: false
    };
    this.tasks.push(task);
  }

  getTaskById(taskId) {
    let foundTask;
    for (let task of this.tasks) {
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  updateTask(taskId, name, category, description, dueDate) {
    const task = this.getTaskById(taskId);
    if (task) {
      task.name = name;
      task.category = category;
      task.description = description;
      task.dueDate = dueDate;
      task.isEditing = false;
    }
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
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('currentId', JSON.stringify(this.currentId));
  }

  load() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    if (localStorage.getItem('currentId')) {
      this.currentId = Number(JSON.parse(localStorage.getItem('currentId')));
    }
  }

  nextMonth() {
    this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + 1);
    this.renderCalendar();
  }

  prevMonth() {
    this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() - 1);
    this.renderCalendar();
  }

  getFilteredTasks(filterDate, filterCategory, filterPriority) {
    return this.tasks.filter(task => {
      const matchDate = !filterDate || task.dueDate === filterDate;
      const matchCategory = !filterCategory || task.category === filterCategory;
      const matchPriority = !filterPriority || task.priority === filterPriority;
      return matchDate && matchCategory && matchPriority;
    });
  }

  render() {
    const filterDate = document.querySelector('#filterDate')?.value || '';
    const filterCategory = document.querySelector('#filterCategory')?.value || '';
    const filterPriority = document.querySelector('#filterPriority')?.value || '';

    const tasksToRender = this.getFilteredTasks(filterDate, filterCategory, filterPriority);

    const tasksHtmlList = [];
    for (let task of tasksToRender) {
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.category || 'General',
        task.description,
        task.dueDate,
        task.priority || 'Medio',
        task.status,
        task.isEditing
      );
      tasksHtmlList.push(taskHtml);
    }

    const taskList = document.querySelector('#taskList');
    const taskCounter = document.querySelector('#taskCounter');

    if (taskList) {
      if (tasksToRender.length === 0 && this.tasks.length > 0) {
        taskList.innerHTML = `<div class="col-12 text-center text-muted py-4"><i class="bi bi-funnel me-1"></i> No se encontraron tareas con los filtros seleccionados.</div>`;
      } else {
        taskList.innerHTML = tasksHtmlList.join('\n');
      }
    }

    if (taskCounter) {
      taskCounter.textContent = `${tasksToRender.length} Tareas mostradas (${this.tasks.length} en total)`;
    }

    this.renderCalendar();
  }

  renderCalendar() {
    const calendarContainer = document.querySelector('#calendarList');
    if (!calendarContainer) return;

    const navYear = this.currentCalendarDate.getFullYear();
    const navMonth = this.currentCalendarDate.getMonth();

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const taskDates = {};
    this.tasks.forEach(task => {
      if (task.dueDate) {
        if (!taskDates[task.dueDate]) {
          taskDates[task.dueDate] = [];
        }
        taskDates[task.dueDate].push(task);
      }
    });

    const firstDayIndex = new Date(navYear, navMonth, 1).getDay();
    const totalDaysInMonth = new Date(navYear, navMonth + 1, 0).getDate();
    const today = new Date();

    let html = `
      <div class="calendar-month-header d-flex justify-content-between align-items-center mb-3">
        <button type="button" class="btn btn-sm btn-outline-secondary" id="prevMonthBtn"><i class="bi bi-chevron-left"></i></button>
        <span class="fw-bold fs-5 text-dark">${monthNames[navMonth]} ${navYear}</span>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="nextMonthBtn"><i class="bi bi-chevron-right"></i></button>
      </div>
      <div class="calendar-grid-header mb-2">
        ${daysOfWeek.map(day => `<div class="calendar-day-label">${day}</div>`).join('')}
      </div>
      <div class="calendar-grid-days">
    `;

    for (let i = 0; i < firstDayIndex; i++) {
      html += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const monthStr = String(navMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateKey = `${navYear}-${monthStr}-${dayStr}`;

      const hasTasks = taskDates[dateKey] && taskDates[dateKey].length > 0;
      const taskCount = hasTasks ? taskDates[dateKey].length : 0;

      const isToday = day === today.getDate() && navMonth === today.getMonth() && navYear === today.getFullYear();
      const activeClass = hasTasks ? 'has-tasks' : '';
      const todayClass = isToday ? 'is-today' : '';

      const taskTitle = hasTasks 
        ? taskDates[dateKey].map(t => `• ${t.name}`).join('\n') 
        : 'Sin tareas';

      html += `
        <div class="calendar-day ${activeClass} ${todayClass}" data-date="${dateKey}" title="${taskTitle}">
          <span class="day-number">${day}</span>
          ${hasTasks ? `<span class="task-badge-dot">${taskCount}</span>` : ''}
        </div>
      `;
    }

    html += `</div>`;
    calendarContainer.innerHTML = html;
  }
}