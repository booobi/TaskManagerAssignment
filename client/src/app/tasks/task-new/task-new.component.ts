import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Task } from '../task.model';
import { addTaskRequest, taskActionSuccessClear } from '../store/tasks.actions';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {

  success$: Observable<boolean>;
  constructor(private store: Store<{ tasks: Task[], taskAddSuccess: boolean }>) {
    this.success$ = store.pipe(select('tasks'), select('taskAddSuccess'));
    this.store.dispatch(taskActionSuccessClear());
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(addTaskRequest({ title: form.value.title, description: form.value.description }));
  }

}
