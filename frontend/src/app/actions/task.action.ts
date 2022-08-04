import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const showTasks = createAction('[Task] show tasks');
export const getAllTasks = createAction(
  '[Task] get all tasks',
  props<{ tasks: Task[] }>()
);
export const addTask = createAction(
  '[Task] add',
  props<{ id: number; name: string; isDone: boolean }>()
);
export const removeTask = createAction(
  '[Task] remove',
  props<{ taskIndex: number }>()
);
export const checkTask = createAction(
  '[Task] check task',
  props<{ taskIndex: number; task: Task }>()
);
