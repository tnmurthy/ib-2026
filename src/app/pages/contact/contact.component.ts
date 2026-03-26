import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
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
  communityFormSubmitted = false;

  submitCollegeForm() {
    this.collegeFormSubmitted = true;
  }

  submitCommunityForm() {
    this.communityFormSubmitted = true;
  }
}
