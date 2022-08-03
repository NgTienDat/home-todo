import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskAction from '../actions/task.action';
import { TaskState } from '../reducers/task.reducer';

@Component({
  selector: 'app-readtasks',
  templateUrl: './readtasks.component.html',
  styleUrls: ['./readtasks.component.scss'],
})
export class ReadtasksComponent implements OnInit {
  tasks$: Observable<Task[]>;
  constructor(private store: Store<{ tasks: TaskState }>) {
    this.tasks$ = this.store.select('tasks', 'taskList');
  }

  deleteTask(index: number) {
    this.store.dispatch(
      TaskAction.removeTask({
        taskIndex: index,
      })
    );
  }

  checkTask(index: number, task: Task) {
    this.store.dispatch(TaskAction.checkTask({ taskIndex: index, task: task }));
  }

  ngOnInit(): void {
    this.store.dispatch(TaskAction.showTasks());
  }
}
