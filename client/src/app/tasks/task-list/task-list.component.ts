import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasksRequest, deleteTaskRequest } from '../store/tasks.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;
  selectedTaskIndex: number;
  selectedTaskId: number;
  constructor(private store: Store<{tasks: Task[]}>) {
    this.tasks$ = store.pipe(select('tasks'), select('tasks'));
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

  onDelete() {
    this.store.dispatch(deleteTaskRequest({id: this.selectedTaskId}));
  }

  getTaskClass(index) {
    return {
      'list-group-item': true,
      'list-group-item-action': true,
      'active': index === this.selectedTaskIndex
    }
  }
}
