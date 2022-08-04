import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskAction from '../actions/task.action';
import { AppState, reducers, selectAllTasks, taskCounter } from '../app.state';

@Component({
  selector: 'app-readtasks',
  templateUrl: './readtasks.component.html',
  styleUrls: ['./readtasks.component.scss'],
})
export class ReadtasksComponent implements OnInit {
  tasks$: Observable<Task[]>;
  counter$: Observable<number>;
  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.counter$ = this.store.select(taskCounter);
  }

  getImgPath(isDone: boolean): string {
    return isDone
      ? '../../assets/images/checkbox.png'
      : '../../assets/images/empty-checkbox.png';
  }

  deleteTask(index: number) {
    this.store.dispatch(TaskAction.removeTask({ taskIndex: index }));
  }

  checkTask(index: number, task: Task) {
    this.store.dispatch(TaskAction.checkTask({ taskIndex: index, task: task }));
  }

  ngOnInit(): void {
    this.store.dispatch(TaskAction.showTasks());
  }
}
