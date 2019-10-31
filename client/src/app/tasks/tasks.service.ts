import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TasksService {
    constructor(private http: HttpClient) { }

    getTasks() {
        return this.http.get(environment.BACKEND_BASE_URL + "/tasks");
    }

    getTask(taskId: number) {
        return this.http.get(environment.BACKEND_BASE_URL + "/tasks/" + taskId);
    }

    addTask(title: string, description: string) {
        return this.http.post(environment.BACKEND_BASE_URL + "/tasks", {
            title: title,
            description: description
        });
    }

    editTask(taskId: number, newTitle: string, newDescription: string) {
        return this.http.patch(environment.BACKEND_BASE_URL + "/tasks/" + taskId,
            {
                title: newTitle, description: newDescription
            }
        );
    }

    deleteTask(taskId: number) {
        return this.http.delete(environment.BACKEND_BASE_URL + "/tasks/" + taskId);
    }

    completeTask(taskId: number) {
        return this.http.patch(environment.BACKEND_BASE_URL + "/tasks/" + taskId,
            {
                completed: true
            }
        );
    }
}