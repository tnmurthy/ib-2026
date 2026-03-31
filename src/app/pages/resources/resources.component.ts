import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Reusable Components
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';
import { PillTabsComponent, TabItem } from '../../components/shared/pill-tabs/pill-tabs.component';
import { CardGridComponent, CardItem } from '../../components/shared/card-grid/card-grid.component';
import { CtaBlockComponent } from '../../components/shared/cta-block/cta-block.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterLink,
    HeroBlockComponent,
    PillTabsComponent,
    CardGridComponent,
    CtaBlockComponent
  ],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
  
  tabs: TabItem[] = [
    { id: 'articles', label: 'Articles & Insights' },
    { id: 'templates', label: 'Templates & Tools' },
    { id: 'videos', label: 'Videos & Media' }
  ];

  activeTabId: string = 'articles';

  // Newsletter Logic
  newsletterEmail: string = '';
  newsletterSubmitted: boolean = false;
  newsletterLoading: boolean = false;
  newsletterError: string = '';

  onTabChange(id: string) {
    this.activeTabId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  subscribeNewsletter() {
    if (!this.newsletterEmail) return;
    
    this.newsletterLoading = true;
    this.newsletterError = '';
    
    // Simulate API call
    setTimeout(() => {
      this.newsletterLoading = false;
      this.newsletterSubmitted = true;
    }, 1500);
  }
}
