import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private formService: FormService) {}

  collegeForm = {
    name: '',
    designation: '',
    collegeName: '',
    location: '',
    email: '',
    phone: '',
    preferredDateTime: '',
    message: ''
  };

  communityForm = {
    name: '',
    email: '',
    role: '',
    message: ''
  };

  collegeFormSubmitted = false;
  collegeFormLoading = false;
  collegeFormError = '';

  communityFormSubmitted = false;
  communityFormLoading = false;
  communityFormError = '';

  submitCollegeForm() {
    this.collegeFormLoading = true;
    this.collegeFormError = '';

    this.formService.submitCollegeInvite(this.collegeForm).subscribe({
      next: () => {
        this.collegeFormSubmitted = true;
        this.collegeFormLoading = false;
      },
      error: (err: Error) => {
        this.collegeFormError = err.message;
        this.collegeFormLoading = false;
      }
    });
  }

  submitCommunityForm() {
    this.communityFormLoading = true;
    this.communityFormError = '';

    this.formService.submitCommunityMessage(this.communityForm).subscribe({
      next: () => {
        this.communityFormSubmitted = true;
        this.communityFormLoading = false;
      },
      error: (err: Error) => {
        this.communityFormError = err.message;
        this.communityFormLoading = false;
      }
    });
  }
}
