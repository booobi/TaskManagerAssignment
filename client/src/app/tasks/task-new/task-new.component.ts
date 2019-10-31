import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addTaskRequest, taskActionSuccessClear } from '../store/tasks.actions';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { TasksState } from '../store/tasks.reducer';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit, OnDestroy {

  success$: Observable<boolean>;
  
  constructor(private store: Store<TasksState>) {
    this.success$ = store.pipe(select('tasks'), select('taskActionSuccess'));
    this.store.dispatch(taskActionSuccessClear());
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.store.dispatch(taskActionSuccessClear());
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(addTaskRequest({ title: form.value.title, description: form.value.description }));
  }

}
