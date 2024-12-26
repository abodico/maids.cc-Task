import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule, MatTable],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name'];
  page = 1;
  users$: Observable<any> = of([]);
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const params = new HttpParams().set('page', this.page);
    this.users$ = this.http.get<any>('https://reqres.in/api/users', {
      params,
    });
  }
}
