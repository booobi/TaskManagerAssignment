import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Task } from '../task.model';
import { addTaskRequest, addTaskSuccessClear } from '../store/task-list.actions';
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
    this.store.dispatch(addTaskSuccessClear());
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(addTaskRequest({ title: form.value.title, description: form.value.description }));
  }

}
