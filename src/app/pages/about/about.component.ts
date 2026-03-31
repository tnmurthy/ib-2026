import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Reusable Components
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';
import { PillTabsComponent, TabItem } from '../../components/shared/pill-tabs/pill-tabs.component';
import { CtaBlockComponent } from '../../components/shared/cta-block/cta-block.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    HeroBlockComponent,
    PillTabsComponent,
    CtaBlockComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  tabs: TabItem[] = [
    { id: 'story', label: 'Our Story' },
    { id: 'vision', label: 'Vision & Mission' },
    { id: 'values', label: 'Values & Charter' },
    { id: 'founder', label: 'Founder' }
  ];

  activeTabId: string = 'story';

  onTabChange(id: string) {
    this.activeTabId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
