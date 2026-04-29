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
    { id: 'story', label: 'Why Innovat Bharat' },
    { id: 'vision', label: 'Vision & Mission' },
    { id: 'values', label: 'Core Values' },
    { id: 'founder', label: 'Founder' }
  ];

  activeTabId: string = 'story';

  coreValues = [
    {
      icon: '📚',
      title: 'Joyful Continuous Learning (Learning with a Smile)',
      points: [
        'Beyond Exams: We believe learning is not just for degrees, but a lifelong habit that should be fun.',
        'Stay Curious: We encourage students to enjoy the process of discovering new things every single day.',
        'Adapt Quickly: In a fast-changing world, the most important skill is the ability to learn and unlearn with a positive attitude.'
      ]
    },
    {
      icon: '🎯',
      title: 'Vision & Consistency (Big Dreams, Daily Action)',
      points: [
        'The Big Picture: We help students build a clear vision of the impact they want to create in the world.',
        'The Power of Habits: Success is not a one-day miracle; it comes from doing the right things consistently, day after day.',
        'Stay the Course: We believe in matching big, bold goals with steady and honest hard work.'
      ]
    },
    {
      icon: '🤝',
      title: 'Respect Everyone / Respect Work (Values & Dedication)',
      points: [
        'Dignity for All: We treat every person — from a college peon to a CEO — with the same kindness and respect.',
        'Work is Worship: We believe in doing every task, big or small, with 100% dedication and care.',
        'Building Character: For us, building a great business starts with building a great human being.'
      ]
    },
    {
      icon: '💡',
      title: "Don't Postpone — Start Now (Action Over Excuses)",
      points: [
        'Kill Procrastination: We don\'t wait for "Monday" or the "perfect time" to begin a project.',
        'Learn by Doing: The best way to understand a problem is to start solving it today.',
        'The Power of Now: Small steps taken right now are much better than big plans that stay only on paper.'
      ]
    }
  ];

  onTabChange(id: string) {
    this.activeTabId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
