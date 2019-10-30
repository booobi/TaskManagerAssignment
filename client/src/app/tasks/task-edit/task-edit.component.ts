import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { Store, select } from '@ngrx/store';
import { find, concatMap } from 'rxjs/operators';
import { editTaskRequest, taskActionSuccessClear } from '../store/tasks.actions';
import { TasksState } from '../store/tasks.reducer';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskId: number;
  selectedTask$: Observable<Task>;
  success$: Observable<boolean>;
  constructor(
    //the plan here is to fetch the selected task right from the store
    //rather than introducing a 'selectedTask' in the state
    private store: Store<TasksState>) {
      this.selectedTask$ = this.store.pipe(
        select('tasks'), 
        select('viewTask')
        );
        this.selectedTask$.subscribe((task)=>this.taskId = task.id);
      
      this.success$ = this.store.pipe(select('tasks'), select('taskActionSuccess'));
      this.store.dispatch(taskActionSuccessClear());
   }

  ngOnInit() { }

  onSubmit(form) {
    this.store.dispatch(editTaskRequest({taskId: this.taskId, newTask: form.value}));
  }

}
