import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TasksState } from './store/tasks.reducer';
import { Observable, } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { getTasksRequest } from './store/tasks.actions';

@Injectable({ providedIn: 'root' })
export class TaskListGuard implements CanActivate {
    constructor(private store: Store<TasksState>) { }

    isEmpty$: Observable<boolean>;

    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select('tasks'),
            select('requirefetchData'),
            tap(requirefetchData => {
                if (requirefetchData) {
                    this.store.dispatch(getTasksRequest());
                }
            }),
            filter(requirefetchData => !requirefetchData),
            map(() => true)
        );

    }
}