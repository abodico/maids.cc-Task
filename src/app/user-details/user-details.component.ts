import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { User } from '../users-table/users-table.component';
import { UserCardComponent } from '../_components/user-card/user-card.component';
import { Location } from '@angular/common';

export interface UserDetails {
  data: User;
  support: {
    text: string;
    url: string;
  };
}
@Component({
  selector: 'app-user-details',
  imports: [RouterOutlet, HttpClientModule, UserCardComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  itemId: string | null = null;
  user!: User;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // getting user details from api
  loadUser() {
    this.http
      .get<UserDetails>('https://reqres.in/api/users/' + `${this.itemId}`)
      .subscribe((val) => {
        this.user = val.data;
      });
  }

  // getting current url id
  getRouteId() {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.getRouteId();
    this.loadUser();
  }

  goBack(): void {
    this.location.back();
  }
}
