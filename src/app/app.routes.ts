import { Routes } from '@angular/router';
import { UserSelectionComponent } from './pages/user-selection/user-selection.component';
import { TaskListComponent } from './components/task-list/task-list.component';
// import { TaskAssignmentComponent } from './pages/task-assignment/task-assignment.component';

export const routes: Routes = [
  //{ path: '', component: UserSelectionComponent },
  { path: '', component: TaskListComponent },
  // { path: '**', redirectTo: '' }
];