import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Reusable Components
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';
import { CardGridComponent, CardItem } from '../../components/shared/card-grid/card-grid.component';
import { StepFlowComponent, StepItem } from '../../components/shared/step-flow/step-flow.component';
import { CtaBlockComponent } from '../../components/shared/cta-block/cta-block.component';

@Component({
  selector: 'app-for-colleges',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    HeroBlockComponent, 
    CardGridComponent, 
    StepFlowComponent, 
    CtaBlockComponent
  ],
  templateUrl: './for-colleges.component.html',
  styleUrls: ['./for-colleges.component.css']
})
export class ForCollegesComponent {
  
  whyPartnerCards: CardItem[] = [
    { icon: '🎯', title: 'Beyond Placements', description: 'Build reputation through real outcomes: student startups, innovation projects, and holistic development.' },
    { icon: '🌟', title: 'Stronger Ecosystem', description: 'Create a vibrant campus culture with mentorship, industry connections, and entrepreneurial energy.' },
    { icon: '📈', title: 'Better Student Outcomes', description: 'Students gain skills and opportunities—leading to improved employment and higher education success.' },
    { icon: '🤝', title: 'Turnkey Solution', description: 'We handle everything: curriculum design, mentor networks, industry connections, and ongoing support.' }
  ];

  engagementSteps: StepItem[] = [
    { icon: '01', title: 'Awareness & Orientation', description: 'Introductory sessions for students, faculty, and management to explain the ecosystem concept.' },
    { icon: '02', title: 'Department Pilots', description: 'Launch a pilot program with selected departments to demonstrate results before scaling up.' },
    { icon: '03', title: 'Campus Rollout', description: 'Implement the complete Innovat Bharat ecosystem across all years and departments.' }
  ];

  outcomeCards: CardItem[] = [
    { title: 'Student Engagement', description: '80%+ participation in ecosystem programs and improved student motivation.' },
    { title: 'Skills & Employability', description: 'Real projects, internships, and measurable skill development.' },
    { title: 'Innovation', description: 'Student startup teams formed and new innovation projects initiated.' },
    { title: 'Reputation', description: 'Competitive advantage in admissions and recognition as an innovative institution.' }
  ];
}
