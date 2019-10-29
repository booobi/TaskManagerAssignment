import { createEffect, ofType, Actions, act } from '@ngrx/effects';
import { getTasksRequest, getTasksSuccess, addTaskRequest, addTaskSuccess, deleteTaskRequest, deleteTaskSuccess } from './tasks.actions';
import { TasksService } from '../tasks.service';
import { mergeMap, map, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core';

@Injectable()
export class TasksEffects {

    getTasks = createEffect(() => this.actions$.pipe(
        ofType(getTasksRequest),
        mergeMap(() => this.tasksService
            .getTasks()
            .pipe(
                map(tasks => ({ type: getTasksSuccess.type, payload: tasks }))
            )
        )));

    addTask = createEffect(() => this.actions$.pipe(
        ofType(addTaskRequest),
        mergeMap((payloadTask) => this.tasksService
            .addTask(payloadTask)
            .pipe(
                map(() => ({ type: addTaskSuccess.type }))
            )
        )
    ));

    deleteTask = createEffect(() => this.actions$.pipe(
        ofType(deleteTaskRequest),
        mergeMap(({ id }) => this.tasksService
                .deleteTask(id)
                .pipe(
                    map(() => ({ type: deleteTaskSuccess.type }))
                )
        )
    ));

    constructor(private actions$: Actions, private tasksService: TasksService) { }
}

