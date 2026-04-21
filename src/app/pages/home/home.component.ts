// Existing content followed by the change in the slide image path
// The existing code and structure of home.component.ts should be preserved
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  bannerSlides = [
    { imagePath: '/assets/banners/tier3-students.png' },
    // Other slides remain unchanged...
  ];
  // Other component properties and methods remain unchanged
}