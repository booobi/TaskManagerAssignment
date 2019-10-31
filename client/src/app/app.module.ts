import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskNewComponent } from './tasks/task-new/task-new.component';
import { TasksReducer } from './tasks/store/tasks.reducer';
import { TasksEffects } from './tasks/store/tasks.effects';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskListGuard } from './tasks/task-list.guard';
import { TaskSingleGuard } from './tasks/task-single.guard';
import { TaskViewComponent } from './tasks/task-view/task-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', component: TaskListComponent, canActivate: [TaskListGuard] },
  { path: 'tasks/new', component: TaskNewComponent },
  { path: 'tasks/view/:id', component: TaskViewComponent, canActivate: [TaskSingleGuard] },
  { path: 'tasks/edit/:id', component: TaskEditComponent, canActivate: [TaskSingleGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskNewComponent,
    TaskEditComponent,
    TaskViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ tasks: TasksReducer }),
    EffectsModule.forRoot([TasksEffects])
    // ,StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
