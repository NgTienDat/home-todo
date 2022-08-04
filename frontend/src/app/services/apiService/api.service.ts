import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private url = 'http://localhost:3000/api';

  //change to post after jwt token
  getAllTasks(userId: number): Observable<Task[]> {
    return this.httpClient.post<Task[]>(this.url + '/tasks/get', {
      id: userId,
    });
  }

  addTask(description: string): Observable<Task> {
    return this.httpClient.post<Task>(this.url + '/task/add', {
      description: description,
      userId: 9,
    });
  }

  removeTask(id: number): Observable<Task> {
    return this.httpClient.post<Task>(this.url + '/task/delete', {
      id: id,
    });
  }
}
