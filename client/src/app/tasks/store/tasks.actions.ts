import { createAction, props } from '@ngrx/store';
import { Task } from '../task.model';

export const getTasksRequest = createAction('[TaskList Component] Get Tasks Request');
export const getTasksSuccess = createAction('[TaskList Component] Get Tasks Success', props<Task[]>());

export const addTaskRequest = createAction('[TaskNew Component] Add Request', props<Task>());
export const addTaskSuccess = createAction('[TaskNew Component] Add Success');
export const addTaskSuccessClear = createAction('[TaskNew Component] Add Success Clear');

export const editTaskRequest = createAction('[TaskEdit Component] Edit Request', props<{taskId: number, newTask: Task}>());
export const editTaskSuccess = createAction('[TaskEdit Component] Edit Success');

export const deleteTaskRequest = createAction('[TaskList Component] Delete Task Request', props<{id: number}>());
export const deleteTaskSuccess = createAction('[TaskList Component] Delete Task Success');