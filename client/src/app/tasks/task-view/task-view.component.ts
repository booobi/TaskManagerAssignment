import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TasksState } from '../store/tasks.reducer';
import { Observable } from 'rxjs';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  selectedTask$: Observable<Task>;
  constructor(private store: Store<TasksState>) {
    this.selectedTask$ = store.pipe(select('tasks'), select("viewTask"));
   }

  ngOnInit() {
  }

}
