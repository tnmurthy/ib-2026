import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partners-mentors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './partners-mentors.component.html',
  styleUrl: './partners-mentors.component.css'
})
export class PartnersMentorsComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    type: '',
    expertise: '',
    message: ''
  };
  formSubmitted = false;

  submitForm() {
    this.formSubmitted = true;
  }
}
