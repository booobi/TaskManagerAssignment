import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [
    { title: "firstTask", description: "haha" },
    { title: "lastTask" }
  ]
  constructor() { }

  ngOnInit() {
  }

}
