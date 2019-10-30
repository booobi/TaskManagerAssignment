import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, map, switchMap, concatMap, mergeMap, take } from 'rxjs/operators';
import { TasksState } from './store/tasks.reducer';
import { getTasksRequest, getTaskRequest } from './store/tasks.actions';;

@Injectable({ providedIn: 'root' })
export class TaskSingleGuard implements CanActivate {
    constructor(private store: Store<TasksState>) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        let taskId = +route.url[route.url.length - 1];
        //make sure tasks exist
        //TODO: add error handling
        return this.store.pipe(
            select('tasks'),
            select('viewTask'),
            tap(viewTask => {
                if (!viewTask) {
                    this.store.dispatch(getTaskRequest({taskId: taskId}));
                }
            }),
            filter(viewTask => viewTask),
            map(() => true)
        );
    }
}