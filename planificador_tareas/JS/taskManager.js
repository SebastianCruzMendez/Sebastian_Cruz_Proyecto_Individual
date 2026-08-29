class TaskManager {
  // Constructor acepta currentId con valor predeterminado 0
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  // Método para agregar tareas de manera programática
  addTask(name, description, dueDate, status = 'PORHACER') {
    // Incrementar el identificador
    this.currentId++;

    // Crear el objeto de la nueva tarea
    const task = {
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: status
    };

    // Agregar la tarea al array
    this.tasks.push(task);
  }
}