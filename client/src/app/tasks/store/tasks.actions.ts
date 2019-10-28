import { createAction, props } from '@ngrx/store';
import { Task } from '../task.model';

export const getTasksRequest = createAction('[Tasks Component] Get Tasks Request');
export const getTasksSuccess = createAction('[Tasks Component] Get Tasks Success', props<Task[]>());