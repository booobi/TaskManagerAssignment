import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TasksState } from '../store/tasks.reducer';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit, OnDestroy {

  selectedTask$: Observable<Task>;
  selectedTaskId: number;
  selectedTaskIdSub: Subscription;
  constructor(
    private store: Store<TasksState>,
    private router: Router) {
    this.selectedTask$ = store.pipe(select('tasks'), select("viewTask"));
    this.selectedTaskIdSub = this.selectedTask$.subscribe(task => {
      this.selectedTaskId = task.id
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.selectedTaskIdSub.unsubscribe();
  }

  onCancel() {
    this.router.navigate(['tasks']);
  }

  onEdit() {
    this.router.navigate(["tasks", "edit", this.selectedTaskId]);
  }

}
