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

  unifiedForm = {
    name: '',
    email: '',
    phone: '',
    role: '',
    collegeName: '',
    designation: '',
    location: '',
    message: ''
  };

  formSubmitted = false;
  formLoading = false;
  formError = '';

  submitUnifiedForm() {
    this.formLoading = true;
    this.formError = '';

    if (this.unifiedForm.role === 'college') {
      const collegeData = {
        name: this.unifiedForm.name,
        email: this.unifiedForm.email,
        phone: this.unifiedForm.phone,
        collegeName: this.unifiedForm.collegeName,
        designation: this.unifiedForm.designation,
        location: this.unifiedForm.location,
        message: this.unifiedForm.message
      };
      this.formService.submitCollegeInvite(collegeData).subscribe({
        next: () => {
          this.formSubmitted = true;
          this.formLoading = false;
        },
        error: (err: Error) => {
          this.formError = err.message;
          this.formLoading = false;
        }
      });
    } else {
      const communityData = {
        name: this.unifiedForm.name,
        email: this.unifiedForm.email,
        role: this.unifiedForm.role,
        message: this.unifiedForm.message
      };
      this.formService.submitCommunityMessage(communityData).subscribe({
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
}
