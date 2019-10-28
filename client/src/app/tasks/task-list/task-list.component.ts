import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasksRequest } from './store/task-list.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(private store: Store<{tasks: Task[]}>) {
    this.tasks$ = store.pipe(select('tasks'), select('tasks'));
   }

  ngOnInit() {
  }

  fetch() {
    this.store.dispatch(getTasksRequest());
  }
}
