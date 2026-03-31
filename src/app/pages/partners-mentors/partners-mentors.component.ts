import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Reusable Components
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';
import { CardGridComponent, CardItem } from '../../components/shared/card-grid/card-grid.component';
import { PillTabsComponent, TabItem } from '../../components/shared/pill-tabs/pill-tabs.component';
import { CtaBlockComponent } from '../../components/shared/cta-block/cta-block.component';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-partners-mentors',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    HeroBlockComponent,
    CardGridComponent,
    PillTabsComponent,
    CtaBlockComponent
  ],
  templateUrl: './partners-mentors.component.html',
  styleUrl: './partners-mentors.component.css'
})
export class PartnersMentorsComponent {
  constructor(private formService: FormService) {}

  tabs: TabItem[] = [
    { id: 'team', label: 'Our Team' },
    { id: 'networks', label: 'Mentor Networks' },
    { id: 'join', label: 'Join the Mission' }
  ];

  activeTabId: string = 'team';

  networkCards: CardItem[] = [
    { icon: '🎒', title: 'Jagriti Yatra Network', description: 'Access to a nation-wide network of purpose-driven mentors and change agents from India\'s largest entrepreneurship journey.' },
    { icon: '🏫', title: 'IIT / IIM Alumni', description: 'Mentors from premier technical and management institutions volunteering to bridge the gap between tier 1 and tier 3 education.' },
    { icon: '🏭', title: 'Industry Practitioners', description: 'Working professionals and startup founders engaging students through expert sessions and live project mentorship.' },
    { icon: '🌱', title: 'Local Business', description: 'Traditional business families bringing generational business wisdom and ground-level market understanding.' }
  ];

  onTabChange(id: string) {
    this.activeTabId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
