import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {
  constructor(private formService: FormService) {}

  newsletterEmail = '';
  newsletterSubmitted = false;
  newsletterLoading = false;
  newsletterError = '';

  subscribeNewsletter() {
    if (!this.newsletterEmail) return;
    this.newsletterLoading = true;
    this.newsletterError = '';

    this.formService.subscribeNewsletter({ email: this.newsletterEmail }).subscribe({
      next: () => {
        this.newsletterSubmitted = true;
        this.newsletterLoading = false;
      },
      error: (err: Error) => {
        this.newsletterError = err.message;
        this.newsletterLoading = false;
      }
    });
  }
}
