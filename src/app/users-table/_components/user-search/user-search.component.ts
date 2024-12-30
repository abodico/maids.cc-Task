import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { UserDetails } from '../../../user-details/user-details.component';
import { CircularProgressComponent } from '../../../_components/circular-progress/circular-progress.component';

@Component({
  selector: 'app-user-search',
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    CircularProgressComponent,
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css',
})
export class UserSearchComponent implements OnDestroy, OnInit {
  user: any = null;
  error: string | null = null;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();
  private searchTerm$ = new Subject<number>();

  constructor(private http: HttpClient) {}

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const id = parseInt(input.value, 10);
      if (!isNaN(id)) {
        this.searchTerm$.next(id);
      }
    }
  }

  fetchUser(userId: number): void {
    const url = `https://reqres.in/api/users/${userId}`;
    this.isLoading = true;
    this.http.get<UserDetails>(url).subscribe(
      (response) => {
        this.user = response.data;
        this.error = null;
        this.isLoading = false;
      },
      () => {
        this.user = null;
        this.error = 'User not found. Please try another ID.';
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    // The pipe method is used to compose multiple RxJS operators that process the observable's data.
    //  These operators act as filters or transformations.
    this.searchTerm$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((id) => this.fetchUser(id));
  }
}
