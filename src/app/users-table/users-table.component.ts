import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserCardComponent } from '../_components/user-card/user-card.component';
import { UserSearchComponent } from './_components/user-search/user-search.component';
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface Request {
  data: User[];
  page: number;
  per_page: number;
  support: {
    text: string;
    url: string;
  };
  total: number;
  total_pages: number;
}

@Component({
  selector: 'app-users-table',
  imports: [
    CommonModule,
    MatPaginator,
    MatGridList,
    MatGridListModule,
    RouterOutlet,
    UserCardComponent,
    HttpClientModule,
    UserSearchComponent,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  page = 1;
  perPage = 5;
  total = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  // getting users from api
  loadUsers() {
    const params = new HttpParams()
      .set('page', `${this.page}`)
      .set('per_page', `${this.perPage}`);
    this.http
      .get<Request>('https://reqres.in/api/users', {
        params,
      })
      .subscribe((val) => {
        this.total = val.total;
        this.users = val.data;
      });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  onPageChange(event: PageEvent): void {
    this.perPage = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadUsers();
  }
}
