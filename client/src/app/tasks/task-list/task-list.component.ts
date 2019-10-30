import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasksRequest, deleteTaskRequest } from '../store/tasks.actions';
import { Router } from '@angular/router';
import { TasksState } from '../store/tasks.reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;
  selectedTaskIndex: number;
  selectedTaskId: number;
  constructor(private store: Store<TasksState>,
    private router: Router) {
    this.tasks$ = store.pipe(select('tasks'), select('taskList'));
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
    // TODO: add relativeTo instead of hardcoded root
    this.router.navigate(['tasks/edit', this.selectedTaskId]);
  }

  onDelete() {
    this.store.dispatch(deleteTaskRequest({ id: this.selectedTaskId }));
  }

  getTaskClass(index) {
    return {
      'list-group-item': true,
      'list-group-item-action': true,
      'active': index === this.selectedTaskIndex
    }
  }
}
