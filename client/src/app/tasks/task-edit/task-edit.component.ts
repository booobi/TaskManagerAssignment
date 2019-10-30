import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { Store, select } from '@ngrx/store';
import { find, concatMap } from 'rxjs/operators';
import { editTaskRequest, taskActionSuccessClear } from '../store/tasks.actions';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  id: number;

  routeId: number;
  selectedTask$: Observable<Task>;
  success$: Observable<boolean>;
  constructor(
    //the plan here is to fetch the selected task right from the store
    //rather than introducing a 'selectedTask' in the state
    //TODO: Change 'any' to actual store structure
    private store: Store<any>,
    private route: ActivatedRoute) {
      this.routeId = +this.route.snapshot.url[this.route.snapshot.url.length-1];
      
      this.selectedTask$ = this.store.pipe(
        select('tasks'), 
        select('tasks'),
        concatMap(task => task),
        find((task: Task) => task.id == this.routeId)
        );

      this.success$ = this.store.pipe(select('tasks'), select('taskAddSuccess'));
      this.store.dispatch(taskActionSuccessClear());
   }

  ngOnInit() {
    this.id = +this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
  }

  onSubmit(form) {
    this.store.dispatch(editTaskRequest({taskId: this.routeId, newTask: form.value}));
  }

}
