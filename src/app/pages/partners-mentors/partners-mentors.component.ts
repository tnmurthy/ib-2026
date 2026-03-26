import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-partners-mentors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './partners-mentors.component.html',
  styleUrl: './partners-mentors.component.css'
})
export class PartnersMentorsComponent {
  constructor(private formService: FormService) {}

  formData = {
    name: '',
    email: '',
    phone: '',
    type: '',
    expertise: '',
    message: ''
  };

  formSubmitted = false;
  formLoading = false;
  formError = '';

  submitForm() {
    this.formLoading = true;
    this.formError = '';

    this.formService.submitPartnerInterest(this.formData).subscribe({
      next: () => {
        this.formSubmitted = true;
        this.formLoading = false;
      },
      error: (err: Error) => {
        this.formError = err.message;
        this.formLoading = false;
      }
    });
  }
}
