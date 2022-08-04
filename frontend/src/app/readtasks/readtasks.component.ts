import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskAction from '../actions/task.action';
import { AppState, selectAllTasks, taskCounter } from '../app.state';
import { ApiService } from '../services/apiService/api.service';

@Component({
  selector: 'app-readtasks',
  templateUrl: './readtasks.component.html',
  styleUrls: ['./readtasks.component.scss'],
})
export class ReadtasksComponent implements OnInit {
  tasks$: Observable<Task[]>;
  counter$: Observable<number>;
  constructor(private store: Store<AppState>, private service: ApiService) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.counter$ = this.store.select(taskCounter);
  }

  getImgPath(isDone: boolean): string {
    return isDone
      ? '../../assets/images/checkbox.png'
      : '../../assets/images/empty-checkbox.png';
  }

  deleteTask(index: number, task: Task) {
    this.service.removeTask(task.id).subscribe();
    this.store.dispatch(TaskAction.removeTask({ taskIndex: index }));
  }

  checkTask(index: number, task: Task) {
    this.store.dispatch(TaskAction.checkTask({ taskIndex: index, task: task }));
  }

  ngOnInit(): void {
    this.service.getAllTasks(9).subscribe((tasks) => {
      if (tasks) {
        this.store.dispatch(TaskAction.getAllTasks({ tasks: tasks }));
      } else {
        this.store.dispatch(TaskAction.showTasks());
      }
    });
  }
}
