import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Reusable Components
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';
import { StepFlowComponent, StepItem } from '../../components/shared/step-flow/step-flow.component';
import { CardGridComponent, CardItem } from '../../components/shared/card-grid/card-grid.component';
import { AmlaFlowComponent } from '../../components/shared/amla-flow/amla-flow.component';
import { VerticalPillarsComponent } from '../../components/shared/vertical-pillars/vertical-pillars.component';
import { CtaBlockComponent } from '../../components/shared/cta-block/cta-block.component';
import { PillTabsComponent, TabItem } from '../../components/shared/pill-tabs/pill-tabs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    HeroBlockComponent, 
    StepFlowComponent, 
    CardGridComponent, 
    AmlaFlowComponent, 
    VerticalPillarsComponent, 
    CtaBlockComponent,
    PillTabsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  // Navigation Tabs
  tabs: TabItem[] = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'method', label: 'Our Method' },
    { id: 'strategy', label: 'Strategy & Data' },
    { id: 'who-for', label: 'Who It’s For' }
  ];
  
  activeTabId: string = 'how-it-works';

  // Section 1: How It Works Data
  howItWorksSteps: StepItem[] = [
    { icon: '🔍', title: 'Audit & Strategy', description: 'We assess the college\'s current gap and map out a tailored ecosystem strategy.' },
    { icon: '🏗️', title: 'Ecosystem Setup', description: 'Deploying mentors and establishing entrepreneurial thinking directly on campus.' },
    { icon: '📈', title: 'Growth & Placement', description: 'Integrating students into real-world projects and driving final placements.' }
  ];

  // Section 2: Solutions Data
  solutionCards: CardItem[] = [
    { icon: '🧠', title: 'Mindset & Foundation', description: 'Early-year clarity sessions and foundational skills that set students on the right path.' },
    { icon: '🏢', title: 'Industry Exposure', description: 'Real internships, live projects, and mentorship from industry practitioners.' },
    { icon: '🚀', title: 'Startup Culture', description: 'Student startup teams, incubation support, and a culture of experimentation.' },
    { icon: '🤝', title: 'Community', description: 'Alumni-like networks and traditional business wisdom from local entrepreneurs.' }
  ];

  // Section 4: Strategy Data
  dataPillars: CardItem[] = [
    { icon: '📚', title: 'Case Studies', description: 'Learning from successful and failed "Made in India" startups like Amul.' },
    { icon: '🏛️', title: 'Govt Schemes', description: 'Aggregating state and central schemes designed to support small startups.' },
    { icon: '💡', title: 'Problem Statements', description: 'Identifying business opportunities in energy and import/export sectors.' }
  ];

  // Section 5: Who It's For Data
  personaCards: CardItem[] = [
    { icon: '👨‍🎓', title: 'Students & Families', description: 'Clear career direction and real skills that lead to high-quality employment.', list: ['Paid internships', 'Confidence build', 'Direct placements'] },
    { icon: '🏛️', title: 'Colleges', description: 'Enhanced reputation and student outcomes through industry partnerships.', list: ['Competitive edge', 'Startup culture', 'Better admissions'] },
    { icon: '🏢', title: 'Industry', description: 'Access to job-ready talent pool with practical project experience.', list: ['Low training cost', 'Talent pipeline', 'CSR Impact'] }
  ];

  onTabChange(id: string) {
    this.activeTabId = id;
    // Scroll to top of content wrapper to ensure user sees the start of new section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
