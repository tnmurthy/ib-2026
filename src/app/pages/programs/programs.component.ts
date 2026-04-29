import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Reusable Components
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';
import { CardGridComponent, CardItem } from '../../components/shared/card-grid/card-grid.component';
import { PillTabsComponent, TabItem } from '../../components/shared/pill-tabs/pill-tabs.component';
import { CtaBlockComponent } from '../../components/shared/cta-block/cta-block.component';

interface ProgramDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  features: string[];
  meta: string[];
}

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    HeroBlockComponent,
    PillTabsComponent,
    CtaBlockComponent
  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent {
  
  tabs: TabItem[] = [
    { id: 'ecosystem', label: 'Campus Ecosystem' },
    { id: 'foundation', label: '1st Year: Mindset' },
    { id: 'internships', label: '2nd Year+: Work' },
    { id: 'innovation', label: '3rd/4th Year: Labs' },
    { id: 'expert', label: 'Expert Connect' }
  ];

  activeTabId: string = 'ecosystem';

  programs: ProgramDetail[] = [
    {
      id: 'ecosystem',
      title: 'Campus Ecosystem Program',
      subtitle: 'Flagship · All Years',
      icon: '🏛️',
      description: 'A structured, year-round parallel ecosystem built inside your college. It integrates mindset training, industry exposure, and mentorship alongside academics.',
      features: [
        'Weekly sessions integrated with college timetable',
        'Dedicated batch mentors',
        'Semester-wise milestone tracking',
        'Industry visits and live projects'
      ],
      meta: ['📅 Full academic year', '👥 1st – 4th year', '🎓 All streams']
    },
    {
      id: 'foundation',
      title: 'Foundation & Mindset Series',
      subtitle: '1st Year Focus',
      icon: '🧠',
      description: 'Career clarity, goal-setting, and entrepreneurial thinking for first-year students. Build the mental foundation before semester cycles take over.',
      features: [
        'Self-discovery workshops',
        'Intro to startup culture',
        'Soft skills and confidence building',
        'Exposure to industry realities'
      ],
      meta: ['📅 First two semesters', '👥 1st year students', '🎓 All streams']
    },
    {
      id: 'internships',
      title: 'Earn-While-You-Learn Pathways',
      subtitle: '2nd Year Onwards',
      icon: '💼',
      description: 'Real work, project work that builds portfolios.',
      features: [
        'Matched placements (Stream-based)',
        'Compatible with college schedule',
        'Industry lead mentorship'
      ],
      meta: ['📅 Ongoing cycles', '👥 2nd year onwards', '🎓 Tech, Commerce, Agri']
    },
    {
      id: 'innovation',
      title: 'Startup & Innovation Labs',
      subtitle: '3rd & 4th Year Focus',
      icon: '🚀',
      description: 'Ideate, validate, and launch micro-ventures. Teams go through exploration, validation, prototype, and pitch stages with support.',
      features: [
        'Cross-domain team formation',
        'Structured innovation sprints',
        'Investor/Grant exposure',
        'Pathway to incubation (IIT/IIM)'
      ],
      meta: ['📅 Two semesters minimum', '👥 3rd & 4th year', '🎓 All streams']
    },
    {
      id: 'expert',
      title: 'Industry Connect Series',
      subtitle: 'All Years · Regular Cadence',
      icon: '🌐',
      description: 'Sessions by practitioners—not speakers. Real insights into technology, agriculture, manufacturing, and finance from those in the field.',
      features: [
        'Monthly expert Q&A',
        'Quarterly site visits',
        'Domain-specific workshops',
        'Jagriti Yatra alumni access'
      ],
      meta: ['📅 Monthly/Quarterly', '👥 All students', '🎓 Multi-track available']
    }
  ];

  get currentProgram() {
    return this.programs.find(p => p.id === this.activeTabId);
  }

  onTabChange(id: string) {
    this.activeTabId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
