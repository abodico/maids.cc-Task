import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-root',
  imports: [UsersTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-material';
}
