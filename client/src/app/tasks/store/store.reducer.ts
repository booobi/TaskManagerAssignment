import { createReducer, on, Action, ActionCreator } from '@ngrx/store';
import { getTasksSuccess } from './store.actions';
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
    on(getTasksSuccess, (state: State, tasks) => ({...state, tasks: tasks}))
)

export function tasksReducer(state, action) {
    return _tasksReducer(state, action);
}