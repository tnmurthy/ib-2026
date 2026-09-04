import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  email: string = '';
  submitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  subscribeNewsletter(event: Event) {
    event.preventDefault();
    if (!this.email || !this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const apiUrl = '/api/newsletter';
    
    this.http.post<{success?: boolean, error?: string}>(apiUrl, { email: this.email }).subscribe({
      next: (res) => {
        this.submitting = false;
        if (res.success) {
          this.successMessage = 'Thanks for subscribing!';
          this.email = '';
        } else {
          this.errorMessage = res.error || 'Subscription failed.';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        this.errorMessage = err.error?.error || 'Subscription failed. Please try again.';
      }
    });
  }
}
