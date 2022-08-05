import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  private url = 'http://localhost:3000/api';

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url + '/tasks/get');
  }

  addTask(description: string): Observable<Task> {
    return this.httpClient.post<Task>(this.url + '/task/add', {
      description: description,
    });
  }

  removeTask(id: number): Observable<Task> {
    return this.httpClient.post<Task>(this.url + '/task/delete', {
      id: id,
    });
  }

  checkTask(taskId: number, isDone: boolean): Observable<Task> {
    return this.httpClient.put<Task>(this.url + '/task/update', {
      id: taskId,
      isDone: isDone,
    });
  }

  registerUser(username: string, password: string) {
    const userInfo = { username: username, password: password };
    return this.httpClient.post(this.url + '/register', userInfo).subscribe({
      next: () => {
        this.authService.login(username, password).subscribe(() => {
          this.router.navigate(['/app']);
        });
      },
      error: (err) => {
        console.log('error here!');
        console.error(err);
      },
    });
  }
}
