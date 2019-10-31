import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../task.model';
import { Store, select } from '@ngrx/store';
import { editTaskRequest, taskActionSuccessClear } from '../store/tasks.actions';
import { TasksState } from '../store/tasks.reducer';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {

  taskId: number;
  taskIdSub: Subscription;
  selectedTask$: Observable<Task>;
  success$: Observable<boolean>;
  
  constructor(
    private store: Store<TasksState>,
    private router: Router) {
    this.selectedTask$ = this.store.pipe(
      select('tasks'),
      select('viewTask')
    );
    this.taskIdSub = this.selectedTask$.subscribe((task) => this.taskId = task.id);

    this.success$ = this.store.pipe(select('tasks'), select('taskActionSuccess'));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.taskIdSub.unsubscribe();
    this.store.dispatch(taskActionSuccessClear());
  }

  onSubmit(form) {
    this.store.dispatch(editTaskRequest({ taskId: this.taskId, newTask: form.value }));
  }

  onCancel() {
    this.router.navigate(["tasks"]);
  }

}
