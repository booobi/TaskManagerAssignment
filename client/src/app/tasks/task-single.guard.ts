import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, map, switchMap, concatMap, mergeMap, take } from 'rxjs/operators';
import { TasksState } from './store/tasks.reducer';
import { getTasksRequest } from './store/tasks.actions';;

@Injectable({ providedIn: 'root' })
export class TaskSingleGuard implements CanActivate {
    constructor(private store: Store<TasksState>) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        let taskId = +route.url[route.url.length - 1];
        //make sure tasks exist first
        let tasksExist$ = this.store.pipe(
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

        //check if task with url id exists in (now with fetched data) store
        return tasksExist$.pipe(switchMap(() => this.store.pipe(
            select('tasks'),
            select('taskList'),
            filter(tasks => tasks.filter((task)=>task.id == taskId).length == 1),
            //if any observable is returned -> true
            switchMap(() => of(true))
        )));
    }
}