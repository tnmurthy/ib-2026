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
    { icon: '🎯', title: 'Beyond Just Job Packages', description: 'Move away from the narrow focus on "highest salaries" and start measuring success by the number of leaders and creators you produce.' },
    { icon: '🌟', title: 'A New Identity as a Startup Hub', description: 'Your college becomes famous for the startups it has successfully incubated and the entrepreneurs it has built.' },
    { icon: '🧲', title: 'Attract the Best Talent', description: 'A reputation for innovation naturally attracts the most ambitious and high-potential students to your campus.' },
    { icon: '🔥', title: 'A Culture of Creation', description: 'Transform the campus atmosphere from "exam-focused" to a high-energy culture of building, solving, and creating.' },
    { icon: '🤝', title: 'A Powerful Alumni Network', description: 'As your student-founders become successful, they remain deeply connected and give back to the college that supported them.' },
    { icon: '🔄', title: 'The Hiring Loop', description: 'Successful alumni return to their own campus first to hire fresh talent, ensuring a bright future for every junior student.' },
    { icon: '🌱', title: 'A Self-Growing Ecosystem', description: 'Build a sustainable system that grows on its own strength, creating long-term success without needing outside help.' },
    { icon: '🏆', title: 'National Recognition', description: 'Elevate your college\'s standing to a national level, making it a role model for modern education in India.' }
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
