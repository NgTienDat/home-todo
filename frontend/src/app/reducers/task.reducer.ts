import { Task } from '../models/task.model';
import * as TaskAction from '../actions/task.action';
import { createReducer, createSelector, on } from '@ngrx/store';
export interface TaskState {
  taskList: Task[];
}

export const initialState: TaskState = {
  taskList: [],
};

export const taskReducer = createReducer(
  initialState,
  on(TaskAction.addTask, (state, action) => {
    return {
      taskList: createTask(state.taskList, action.name),
    };
  }),
  on(TaskAction.removeTask, (state, action) => {
    return {
      taskList: removeTask(state.taskList, action.taskIndex),
    };
  }),
  on(TaskAction.checkTask, (state, action) => {
    return {
      taskList: checkTask(state.taskList, action.taskIndex, action.task),
    };
  }),
  on(TaskAction.showTasks, (state) => {
    return {
      ...state,
    };
  })
);

const createTask = (taskList: Task[], name: string) => {
  let newTask: Task = {
    name: name,
    isDone: false,
  };
  return [...taskList, newTask];
};
const removeTask = (taskList: Task[], index: number) => {
  let newTaskList = [...taskList];
  newTaskList.splice(index, 1);
  return newTaskList;
};
const checkTask = (taskList: Task[], index: number, task: Task) => {
  let newTaskList = [...taskList];
  let updatedTask = {
    isDone: !task.isDone,
  };
  newTaskList[index] = Object.assign({}, newTaskList[index], updatedTask);
  return newTaskList;
};
