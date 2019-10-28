import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasksRequest } from './store/tasks.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

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
