import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromTask from './reducers/task.reducer';

export interface AppState {
  tasks: fromTask.TaskState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: fromTask.taskReducer,
};

export const selectAllTasks = (state: AppState) => {
  return state.tasks?.taskList || [];
};
export const taskCounter = createSelector(selectAllTasks, (taskList) => {
  return taskList.filter((task) => !task.isDone).length;
});
