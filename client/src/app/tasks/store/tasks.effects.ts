import { createEffect, ofType, Actions, act } from '@ngrx/effects';
import { getTasksRequest, getTasksSuccess, addTaskRequest, addTaskSuccess, deleteTaskRequest, deleteTaskSuccess, editTaskRequest, editTaskSuccess, getTaskRequest, getTaskSuccess, completeTaskRequest, completeTaskSuccess } from './tasks.actions';
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

    getTask = createEffect(() => this.actions$.pipe(
        ofType(getTaskRequest),
        mergeMap(({taskId}) => this.tasksService
            .getTask(taskId)
            .pipe(
                map(task => ({ type: getTaskSuccess.type, payload: task }))
            )
        )));

    addTask = createEffect(() => this.actions$.pipe(
        ofType(addTaskRequest),
        mergeMap((payloadTask) => this.tasksService
            .addTask(payloadTask.title, payloadTask.description)
            .pipe(
                map(() => ({ type: addTaskSuccess.type }))
            )
        )
    ));

    editTask = createEffect(() => this.actions$.pipe(
        ofType(editTaskRequest),
        mergeMap(payload => this.tasksService
            .editTask(payload.taskId, payload.newTask.title, payload.newTask.description)
            .pipe(
                map(() => ({type: addTaskSuccess.type}))
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

    completeTask = createEffect(() => this.actions$.pipe(
        ofType(completeTaskRequest),
        mergeMap(({id})=> this.tasksService
        .completeTask(id)
        .pipe(
            map(()=> ({type: completeTaskSuccess.type}))
        ))
    ));
    
    tasksRefresh = createEffect(() => this.actions$.pipe(
        ofType(deleteTaskSuccess, completeTaskSuccess),
        map(()=> ({type: getTasksRequest.type}))
    ));

    constructor(private actions$: Actions, private tasksService: TasksService) { }
}

