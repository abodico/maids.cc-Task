import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
// import { AppComponent } from './app.component';
import { UsersTableComponent } from './users-table/users-table.component';

export const routes: Routes = [
  { path: '', component: UsersTableComponent },
  { path: 'user/:id', component: UserDetailsComponent },
];
