import { createReducer, on, Action, ActionCreator } from '@ngrx/store';
import { getTasksSuccess } from './tasks.actions';
import { Task } from '../task.model';
import { TypedAction } from '@ngrx/store/src/models';

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

const _tasksReducer = createReducer(initialState,
    on(getTasksSuccess, (state: State, action: {type: string, payload: Task[]}) => ({...state, tasks: action.payload})
    
    ));

export function tasksReducer(state, action) {
    return _tasksReducer(state, action);
}