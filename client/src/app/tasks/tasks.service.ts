import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from './task.model';

@Injectable({providedIn: 'root'})
export class TasksService {
    constructor(private http: HttpClient) {}

    getTasks() {
        return this.http.get(environment.BACKEND_BASE_URL + "/tasks");
    }

    addTask(task: Task) {
        return this.http.post(environment.BACKEND_BASE_URL + "/tasks", {
            title: task.title,
            description: task.description
        });
    }
}