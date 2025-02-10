import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'task-manager',
  styleUrl: 'task-manager.css',
  shadow: true,
})
export class TaskManager {
  @State() tasks = [
    { id: 1, name: 'Tarefa 1', description: '', time: 0, running: false, completed: false, completedAt: null, intervalId: null },
    { id: 2, name: 'Tarefa 2', description: '', time: 0, running: false, completed: false, completedAt: null, intervalId: null },
  ];

  @State() newTaskName = '';
  @State() newTaskDescription = '';

  formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  addTask() {
    if (this.newTaskName.trim() === '') return;
    const newTask = {
      id: this.tasks.length + 1,
      name: this.newTaskName,
      description: this.newTaskDescription,
      time: 0,
      running: false,
      completed: false,
      completedAt: null,
      intervalId: null,
    };
    this.tasks = [...this.tasks, newTask];
    this.newTaskName = '';
    this.newTaskDescription = '';
  }

  toggleTimer(taskId: number) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        if (task.running) {
          clearInterval(task.intervalId);
          return { ...task, running: false, intervalId: null };
        } else {
          const intervalId = setInterval(() => {
            this.tasks = this.tasks.map((t) =>
              t.id === taskId ? { ...t, time: t.time + 1 } : t
            );
          }, 1000);
          return { ...task, running: true, intervalId };
        }
      }
      return task;
    });
  }

  completeTask(taskId: number) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        clearInterval(task.intervalId);
        return { ...task, completed: true, running: false, completedAt: new Date().toLocaleString(), intervalId: null };
      }
      return task;
    });
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  render() {
    return (
      <div class="task-manager">
        <div class="task-input">
          <input
            type="text"
            placeholder="Nova tarefa"
            value={this.newTaskName}
            onInput={(e) => (this.newTaskName = (e.target as HTMLInputElement).value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={this.newTaskDescription}
            onInput={(e) => (this.newTaskDescription = (e.target as HTMLInputElement).value)}
          />
          <button onClick={() => this.addTask()} class="add-button">
            + Adicionar
          </button>
        </div>

        <div class="task-list">
          <div class="pending-tasks">
            <h3>Pendentes</h3>
            {this.tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <div class="task" key={task.id}>
                  <div class="task-info">
                    <span>{task.name}</span>
                    {task.description && <p class="task-description">{task.description}</p>}
                  </div>
                  <div class="task-actions">
                    <button onClick={() => this.toggleTimer(task.id)} class="timer-button">
                      {task.running ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={() => this.completeTask(task.id)} class="complete-button">
                      Concluir
                    </button>
                    <button onClick={() => this.deleteTask(task.id)} class="delete-button">
                      Apagar
                    </button>
                    <span>{this.formatTime(task.time)}</span>
                  </div>
                </div>
              ))}
          </div>

          <div class="completed-tasks">
            <h3>Concluídas</h3>
            {this.tasks
              .filter((task) => task.completed)
              .map((task) => (
                <div class="task completed" key={task.id}>
                  <div class="task-row">
                    <div class="task-info">
                      <span>{task.name}</span>
                      {task.description && <p class="task-description">{task.description}</p>}
                    </div>
                    <div class="task-time">
                      <span>{this.formatTime(task.time)}</span>
                      <div class="completed-at">{task.completedAt}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
