import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskAction from '../../actions/task.action';
import { ApiService } from '../../services/apiService/api.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
})
export class AddtaskComponent implements OnInit {
  constructor(private store: Store, private service: ApiService) {}

  addTask(name: string) {
    this.service.addTask(name).subscribe((data) => {
      this.store.dispatch(
        TaskAction.addTask({
          id: data.id,
          name: data.description,
          isDone: data.isDone,
        })
      );
    });
  }

  ngOnInit(): void {}
}
