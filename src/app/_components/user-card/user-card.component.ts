import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../users-table/users-table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [MatCardModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent implements OnInit {
  currentUrl!: string;
  @Input()
  user!: User;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }
}
