import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasksRequest, deleteTaskRequest, completeTaskRequest } from '../store/tasks.actions';
import { Router } from '@angular/router';
import { TasksState } from '../store/tasks.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;
  completedTasks$: Observable<Task[]>;
  selectedTaskIndex: number;
  selectedTaskId: number;

  constructor(
    private store: Store<TasksState>,
    private router: Router) {
    this.tasks$ = store.pipe(select('tasks'), select('taskList'), map(tasks => tasks.filter(task => !task.completed)));
    this.completedTasks$ = store.pipe(select('tasks'), select('taskList'), map(tasks => tasks.filter(task => task.completed)));
  }

  ngOnInit() {
  }

  onRefresh() {
    this.selectedTaskIndex = null;
    this.selectedTaskId = null;
    this.store.dispatch(getTasksRequest());
  }

  onSelectTask(taskIndex: number, taskId: number) {
    this.selectedTaskIndex = taskIndex;
    this.selectedTaskId = taskId;
  }

  onEdit() {
    this.router.navigate(['tasks/edit', this.selectedTaskId]);
  }

  onView() {
    this.router.navigate(['tasks/view', this.selectedTaskId]);
  }

  onDelete() {
    this.store.dispatch(deleteTaskRequest({ id: this.selectedTaskId }));
    this.selectedTaskIndex = null;
    this.selectedTaskId = null;
  }

  onComplete() {
    this.store.dispatch(completeTaskRequest({ id: this.selectedTaskId }));
    this.selectedTaskIndex = null;
    this.selectedTaskId = null;
  }

  getTaskClass(index) {
    return {
      'task': true,
      'list-group-item': true,
      'list-group-item-action': true,
      'active': index === this.selectedTaskIndex
    }
  }
}
