import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TasksState } from './store/tasks.reducer';
import { Observable, } from 'rxjs';
import { tap, take, filter, map, switchMap, isEmpty } from 'rxjs/operators';
import { getTasksRequest } from './store/tasks.actions';

@Injectable({ providedIn: 'root' })
export class TasksGuard implements CanActivate {
    constructor(private store: Store<TasksState>) { }

    isEmpty$: Observable<boolean>;

    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select('tasks'), 
            select('taskList'), 
            map(taskList => taskList.length == 0), 
            tap(isEmpty => {
                if(isEmpty) {
                    this.store.dispatch(getTasksRequest());
                }
            }),
            filter(isEmpty => isEmpty == false),
            map(isEmpty => !isEmpty)
        );
       
    }
}