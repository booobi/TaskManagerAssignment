import { createReducer, on, Action, ActionCreator } from '@ngrx/store';
import { getTasksSuccess, addTaskSuccess, addTaskSuccessClear } from './task-list.actions';
import { Task } from '../task.model';

export interface State {
    tasks: Task[];
    taskAddSuccess: boolean;
}

export const initialState: State = {
    tasks:
        [
            { title: "myFirstTask", description: "blabla" },
            { title: "LastTask", description: "description last" }
        ],
    taskAddSuccess: false
}

const _taskListReducer = createReducer(initialState,
    on(getTasksSuccess, (state: State, action: {type: string, payload: Task[]}) => ({...state, tasks: action.payload})),
    on(addTaskSuccess, (state: State) => ({...state, taskAddSuccess: true})),
    on(addTaskSuccessClear, (state: State) => ({...state, taskAddSuccess: false}))
    
    );

export function TaskListReducer(state, action) {
    return _taskListReducer(state, action);
}