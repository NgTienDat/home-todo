import { Task } from '../models/task.model';
import * as TaskAction from '../actions/task.action';
import { createReducer, on } from '@ngrx/store';
import { ApiService } from '../services/apiService/api.service';
export interface TaskState {
  taskList: Task[];
}

export const initialState: TaskState = {
  taskList: [],
};

export const taskReducer = createReducer(
  initialState,
  on(TaskAction.getAllTasks, (state, action) => {
    return {
      taskList: getTasks(state.taskList, action.tasks),
    };
  }),
  on(TaskAction.addTask, (state, action) => {
    return {
      taskList: createTask(
        state.taskList,
        action.id,
        action.name,
        action.isDone
      ),
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

const createTask = (
  taskList: Task[],
  id: number,
  name: string,
  isDone: boolean
) => {
  let newTask: Task = {
    id: id,
    description: name,
    isDone: isDone,
  };
  return [...taskList, newTask];
};

const getTasks = (taskList: Task[], tasks: Task[]) => {
  let newTaskList = [...tasks];
  return newTaskList;
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
