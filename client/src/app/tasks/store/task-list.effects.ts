import { createEffect, ofType, Actions, act } from '@ngrx/effects';
import { getTasksRequest, getTasksSuccess, addTaskRequest, addTaskSuccess } from './task-list.actions';
import { TasksService } from '../tasks.service';
import { mergeMap, map, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core';

@Injectable()
export class TaskListEffects {

    getTasks = createEffect(() => this.actions$.pipe(
        ofType(getTasksRequest.type),
        mergeMap(() => this.tasksService
            .getTasks()
            .pipe(
                map(tasks => ({ type: getTasksSuccess.type, payload: tasks }))
            )
        )));

    addTask = createEffect(() => this.actions$.pipe(
        ofType(addTaskRequest.type),
        mergeMap((action)=> this.tasksService
            .addTask(action)
                .pipe(
                    map(()=> ({type: addTaskSuccess.type}))
                )
            )
        
    ))

    constructor(private actions$: Actions, private tasksService: TasksService) { }
}

