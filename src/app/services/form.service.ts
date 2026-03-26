import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface CollegeFormData {
  name: string;
  designation: string;
  collegeName: string;
  location: string;
  email: string;
  phone: string;
  preferredDateTime?: string;
  message?: string;
}

export interface PartnerFormData {
  name: string;
  email: string;
  phone?: string;
  type: string;
  expertise?: string;
  message?: string;
}

export interface CommunityFormData {
  name: string;
  email: string;
  role: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitCollegeInvite(data: CollegeFormData): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.base}/api/contact`, data)
      .pipe(catchError(this.handleError));
  }

  submitPartnerInterest(data: PartnerFormData): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.base}/api/partner`, data)
      .pipe(catchError(this.handleError));
  }

  submitCommunityMessage(data: CommunityFormData): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.base}/api/partner`, data)
      .pipe(catchError(this.handleError));
  }

  subscribeNewsletter(data: NewsletterData): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.base}/api/newsletter`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      error.error?.error ||
      'Something went wrong. Please try again or contact us directly.';
    return throwError(() => new Error(message));
  }
}
