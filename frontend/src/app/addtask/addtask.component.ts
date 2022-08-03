import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskAction from '../actions/task.action';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
})
export class AddtaskComponent implements OnInit {
  constructor(private store: Store) {}

  addTask(name: string) {
    this.store.dispatch(TaskAction.addTask({ name: name }));
  }

  ngOnInit(): void {}
}
