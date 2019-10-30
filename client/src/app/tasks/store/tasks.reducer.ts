import { createReducer, on } from '@ngrx/store';
import { getTasksSuccess, addTaskSuccess, taskActionSuccessClear } from './tasks.actions';
import { Task } from '../task.model';

export interface TasksState {
    taskList: Task[];
    taskActionSuccess: boolean;
    loading: boolean;
}

export const initialState: TasksState = {
    taskList: [],
    taskActionSuccess: false,
    loading: true
}

const _tasksReducer = createReducer(initialState,
    on(getTasksSuccess, (state: TasksState, action: { type: string, payload: Task[] }) => ({ ...state, taskList: action.payload, loading: false })),
    on(addTaskSuccess, (state: TasksState) => ({ ...state, taskActionSuccess: true, loading: false })),
    on(taskActionSuccessClear, (state: TasksState) => ({ ...state, taskActionSuccess: false }))

);

export function TasksReducer(state, action) {
    return _tasksReducer(state, action);
}