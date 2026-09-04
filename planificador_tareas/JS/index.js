const taskManager = new TaskManager();

taskManager.load();
taskManager.render();

const newTaskForm = document.querySelector('#taskForm');
const categorySelect = document.querySelector('#newTaskCategory');
const customCategoryContainer = document.querySelector('#customCategoryContainer');
const alertError = document.querySelector('#alertError');
const alertMessage = document.querySelector('#alertMessage');
const taskList = document.querySelector('#taskList');

const filterDate = document.querySelector('#filterDate');
const filterCategory = document.querySelector('#filterCategory');
const filterPriority = document.querySelector('#filterPriority');
const calendarList = document.querySelector('#calendarList');

if (categorySelect) {
  categorySelect.addEventListener('change', function () {
    if (this.value === 'Otra') {
      if (customCategoryContainer) customCategoryContainer.classList.remove('d-none');
    } else {
      if (customCategoryContainer) customCategoryContainer.classList.add('d-none');
    }
  });
}

if (filterDate) filterDate.addEventListener('change', () => taskManager.render());
if (filterCategory) filterCategory.addEventListener('change', () => taskManager.render());
if (filterPriority) filterPriority.addEventListener('change', () => taskManager.render());

if (newTaskForm) {
  newTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.querySelector('#newTaskNameInput');
    const customCategoryInput = document.querySelector('#newCustomCategoryInput');
    const descriptionInput = document.querySelector('#newTaskDescription');
    const dueDateInput = document.querySelector('#newTaskDueDate');
    const prioritySelect = document.querySelector('#newTaskPriority');

    const name = nameInput ? nameInput.value.trim() : '';

    let category = categorySelect ? categorySelect.value : 'Trabajo';
    if (category === 'Otra' && customCategoryInput && customCategoryInput.value.trim() !== '') {
      category = customCategoryInput.value.trim();
    }

    const description = descriptionInput ? descriptionInput.value.trim() : '';
    const dueDate = dueDateInput ? dueDateInput.value : '';
    const priority = prioritySelect ? prioritySelect.value : 'Medio';

    if (!name || !description || !dueDate) {
      if (alertError && alertMessage) {
        alertMessage.textContent = 'Por favor, completa los campos requeridos (Nombre, Descripción y Fecha).';
        alertError.classList.remove('d-none');
      }
      return;
    }

    if (alertError) alertError.classList.add('d-none');

    taskManager.addTask(name, category, description, dueDate, priority);
    taskManager.save();
    taskManager.render();

    newTaskForm.reset();
    if (customCategoryContainer) customCategoryContainer.classList.add('d-none');
  });
}

if (taskList) {
  taskList.addEventListener('click', (event) => {
    const parentTask = event.target.closest('[data-task-id]');
    if (!parentTask) return;

    const taskId = Number(parentTask.dataset.taskId);
    const task = taskManager.getTaskById(taskId);

    const doneBtn = event.target.closest('.done-button');
    if (doneBtn && task) {
      task.status = (task.status === 'Realizada' || task.status === 'DONE') ? 'Pendiente' : 'Realizada';
      taskManager.save();
      taskManager.render();
      return;
    }

    const editBtn = event.target.closest('.edit-button');
    if (editBtn && task) {
      task.isEditing = true;
      taskManager.render();
      return;
    }

    const cancelBtn = event.target.closest('.cancel-button');
    if (cancelBtn && task) {
      task.isEditing = false;
      taskManager.render();
      return;
    }

    const saveBtn = event.target.closest('.save-button');
    if (saveBtn && task) {
      const newName = parentTask.querySelector('.edit-name-input').value.trim();
      const newCategory = parentTask.querySelector('.edit-category-input').value.trim();
      const newDescription = parentTask.querySelector('.edit-desc-input').value.trim();
      const newDueDate = parentTask.querySelector('.edit-date-input').value;

      if (newName && newCategory && newDescription && newDueDate) {
        taskManager.updateTask(taskId, newName, newCategory, newDescription, newDueDate);
        taskManager.save();
        taskManager.render();
      }
      return;
    }

    const deleteBtn = event.target.closest('.delete-button');
    if (deleteBtn) {
      taskManager.deleteTask(taskId);
      taskManager.save();
      taskManager.render();
    }
  });
}

if (calendarList) {
  calendarList.addEventListener('click', (event) => {
    // Ir al mes anterior
    if (event.target.closest('#prevMonthBtn')) {
      taskManager.prevMonth();
      return;
    }

    if (event.target.closest('#nextMonthBtn')) {
      taskManager.nextMonth();
      return;
    }

    const dayCell = event.target.closest('.calendar-day:not(.empty)');
    if (dayCell) {
      const selectedDate = dayCell.dataset.date;
      if (filterDate) {
        filterDate.value = selectedDate;
        taskManager.render();
      }

      const calendarModalEl = document.querySelector('#calendarModal');
      if (calendarModalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(calendarModalEl);
        if (modalInstance) modalInstance.hide();
      }
    }
  });
}