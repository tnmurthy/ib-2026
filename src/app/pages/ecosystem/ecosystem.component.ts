import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Reusable Components
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';
import { StepFlowComponent, StepItem } from '../../components/shared/step-flow/step-flow.component';
import { CardGridComponent, CardItem } from '../../components/shared/card-grid/card-grid.component';
import { PillTabsComponent, TabItem } from '../../components/shared/pill-tabs/pill-tabs.component';
import { VerticalPillarsComponent } from '../../components/shared/vertical-pillars/vertical-pillars.component';
import { CtaBlockComponent } from '../../components/shared/cta-block/cta-block.component';

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroBlockComponent,
    StepFlowComponent,
    CardGridComponent,
    PillTabsComponent,
    VerticalPillarsComponent,
    CtaBlockComponent
  ],
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.css']
})
export class EcosystemComponent {
  
  tabs: TabItem[] = [
    { id: 'problem', label: 'The Problem' },
    { id: 'solution', label: 'The Solution' },
    { id: 'journey', label: 'Learning Journey' },
    { id: 'future', label: 'Future-Ready' }
  ];
  
  activeTabId: string = 'problem';

  // Feature Data
  ecosystemFeatures: CardItem[] = [
    { icon: '🔄', title: 'Integrated', description: 'We don\'t replace college education, we enhance it with structured pathways.' },
    { icon: '📅', title: 'From Day One', description: 'Training starts in the first year—no waiting until final year to think careers.' },
    { icon: '🌐', title: 'Industry Connected', description: 'Real mentors, live projects, and internship opportunities from day one.' },
    { icon: '💡', title: 'Entrepreneurial', description: 'Encouraging students to think like founders and solve local problems.' }
  ];

  // Journey Data
  learningJourney: StepItem[] = [
    { icon: '🌱', title: 'Year 1: Mindset', description: 'Career clarity, soft skills, and introduction to entrepreneurial thinking.' },
    { icon: '💼', title: 'Year 2+: Internships', description: 'Internships support 3 hours daily on real projects.' },
    { icon: '🤝', title: 'Ongoing: Mentorship', description: 'Peer learning, alumni networks, and startup team formation support.' }
  ];

  // Learning Grid Data
  learningTopics: CardItem[] = [
    { icon: '💼', title: 'Entrepreneurship', description: 'Thinking like founders, identifying opportunities, and creating value.' },
    { icon: '📊', title: 'Sales & Marketing', description: 'Understanding markets, customer needs, and business development.' },
    { icon: '💻', title: 'Technology', description: 'Practical skills in tech, engineering, commerce, and agriculture.' },
    { icon: '🔧', title: 'Problem Solving', description: 'Working on actual challenges and delivering real-world value.' }
  ];

  learningMethods: CardItem[] = [
    { icon: '🏢', title: 'Field Visits', description: 'Visiting companies and startups to see theory in practice.' },
    { icon: '🎙️', title: 'Expert Sessions', description: 'Learning from practitioners and professionals with real experience.' },
    { icon: '🎮', title: 'Gamified Learning', description: 'Interactive methods that make skill development enjoyable.' },
    { icon: '🏗️', title: 'Project-Based', description: 'Hands-on projects that build actual portfolios and outcomes.' }
  ];

  onTabChange(id: string) {
    this.activeTabId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
