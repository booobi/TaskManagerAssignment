import { createAction, props } from '@ngrx/store';
import { Task } from '../task.model';

export const getTasksRequest = createAction('[TaskList Component] Get Tasks Request');
export const getTasksSuccess = createAction('[TaskList Component] Get Tasks Success', props<Task[]>());