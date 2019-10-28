import { createReducer, on, Action, ActionCreator } from '@ngrx/store';
import { getTasksSuccess } from './task-list.actions';
import { Task } from '../task.model';

export interface State {
    tasks: Task[];
}

export const initialState: State = {
    tasks:
        [
            { title: "myFirstTask", description: "blabla" },
            { title: "LastTask", description: "description last" }
        ]
}

const _taskListReducer = createReducer(initialState,
    on(getTasksSuccess, (state: State, action: {type: string, payload: Task[]}) => ({...state, tasks: action.payload})
    
    ));

export function TaskListReducer(state, action) {
    return _taskListReducer(state, action);
}