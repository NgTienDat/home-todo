import { Action } from '@ngrx/store';
import { Task } from '../models/task.model';

export const ADD_TASK = '[Task] add';
export const REMOVE_TASK = '[Task] remove';

export class AddTask implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: Task) {}
}

export class RemoveTask implements Action {
  readonly type = REMOVE_TASK;

  constructor(public payload: number) {}
}

export type Actions = AddTask | RemoveTask;
