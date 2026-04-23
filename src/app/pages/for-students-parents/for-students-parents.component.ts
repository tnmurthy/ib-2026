import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Reusable Components
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';
import { StepFlowComponent, StepItem } from '../../components/shared/step-flow/step-flow.component';
import { CardGridComponent, CardItem } from '../../components/shared/card-grid/card-grid.component';
import { PillTabsComponent, TabItem } from '../../components/shared/pill-tabs/pill-tabs.component';
import { CtaBlockComponent } from '../../components/shared/cta-block/cta-block.component';

@Component({
  selector: 'app-for-students-parents',
  standalone: true,
  imports: [
    CommonModule,
    HeroBlockComponent,
    StepFlowComponent,
    CardGridComponent,
    PillTabsComponent,
    CtaBlockComponent
  ],
  templateUrl: './for-students-parents.component.html',
  styleUrls: ['./for-students-parents.component.css']
})
export class ForStudentsParentsComponent {
  
  // Tabs
  tabs: TabItem[] = [
    { id: 'journey', label: 'The Journey' },
    { id: 'benefits', label: 'Why Join?' },
    { id: 'faqs', label: 'Got Questions?' }
  ];
  
  activeTabId: string = 'journey';

  // Journey Data
  studentJourney: StepItem[] = [
    { icon: '🔍', title: 'Audit & Strategy', description: 'Assessing your current gap and mapping out a tailored career ecosystem.' },
    { icon: '🏛️', title: 'Ecosystem Setup', description: 'Deploying mentors and established entrepreneurial thinking on campus.' },
    { icon: '📈', title: 'Growth & Placement', description: 'Integrating with real-world projects and driving final job placements.' }
  ];

  // Benefits Data
  studentBenefits: CardItem[] = [
    { icon: '💰', title: 'Earn While You Learn', description: 'Students can start earning their first income while still in college — financial independence before graduation.' },
    { icon: '🤝', title: 'Helping the Family', description: 'By earning early, students reduce the money pressure on their parents and contribute to the household.' },
    { icon: '📁', title: 'Real Work Profile', description: 'Along with a degree, students build a strong portfolio of real-world projects and ventures that stand out.' },
    { icon: '🧠', title: 'Beyond Books', description: 'They gain the kind of skills and confidence — entrepreneurial thinking, communication, problem-solving — that no textbook can ever teach.' },
    { icon: '🎯', title: 'Clarity Day One', description: 'No more career confusion. Understand your options and strengths from the very first year.' }
  ];

  parentBenefits: CardItem[] = [
    { icon: '🏆', title: 'A Sense of Pride', description: 'Parents feel proud to see their children becoming successful and helping society so early in life.' },
    { icon: '😌', title: 'Huge Relief', description: 'Great peace of mind knowing their children are building a secure future — no extra coaching fees required.' },
    { icon: '🏡', title: 'No Need to Move Away', description: 'Students can build successful lives right from their hometowns — families stay together, roots stay strong.' },
    { icon: '💵', title: 'Saving on City Costs', description: 'No need to worry about the high cost and struggle of moving to crowded, expensive cities for jobs.' },
    { icon: '🌟', title: 'Success at Home', description: 'Children can stay close to their roots while doing world-class work — local pride, global impact.' }
  ];

  faqs = [
    {
      question: 'When can students start participating?',
      answer: 'Students can join from their first year itself. We design programs specifically for each year—foundation training for first years, internships from second year onwards.',
      isOpen: false
    },
    {
      question: 'Is there any fee for students?',
      answer: 'Our programs are typically offered through colleges as part of their ecosystem. Individual fees (if any) are minimal and designed to be affordable. Many internships also provide stipends.',
      isOpen: false
    },
    {
      question: 'Will this interfere with regular classes?',
      answer: 'No. Our programs are designed to complement formal education, not replace it. Activities are scheduled around classes, and internships require only 2-3 hours per day.',
      isOpen: false
    },
    {
      question: 'Are internships guaranteed?',
      answer: 'While we work hard to connect students with internship opportunities, placements depend on student engagement, skill development, and available opportunities.',
      isOpen: false
    }
  ];

  onTabChange(id: string) {
    this.activeTabId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
