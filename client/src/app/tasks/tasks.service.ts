import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TasksService {
    constructor(private http: HttpClient) {}

    getTasks() {
        return this.http.get(environment.BACKEND_BASE_URL + "/tasks");
    }
}