import { createEffect, ofType, Actions } from '@ngrx/effects';
import { getTasksRequest, getTasksSuccess } from './tasks.actions';
import { TasksService } from '../tasks.service';
import { mergeMap, map } from 'rxjs/operators'
import { Injectable } from '@angular/core';

@Injectable()
export class TasksEffects {

    getTasks = createEffect(() => this.actions$.pipe(
        ofType(getTasksRequest.type),
        mergeMap(() => this.tasksService
            .getTasks()
            .pipe(
                map(tasks => ({ type: getTasksSuccess.type, payload: tasks }))
            )
        )));

    constructor(private actions$: Actions, private tasksService: TasksService) { }
}

