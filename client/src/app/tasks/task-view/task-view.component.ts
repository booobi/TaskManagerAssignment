import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TasksState } from '../store/tasks.reducer';
import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  selectedTask$: Observable<Task>;
  constructor(
    private store: Store<TasksState>,
    private router: Router) {
    this.selectedTask$ = store.pipe(select('tasks'), select("viewTask"));
   }

  ngOnInit() {
  }

  onCancel() {
    this.router.navigate(['tasks']);
  }

}
