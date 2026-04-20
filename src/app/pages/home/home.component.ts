import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CardGridComponent, CardItem } from '../../components/shared/card-grid/card-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardGridComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Auto-rotating Banner Logic
  bannerImages: string[] = [
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000&auto=format&fit=crop', // Tech collaboration
    'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2000&auto=format&fit=crop', // Classroom context
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop', // Grassroots learning
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop', // Maker/Workshop lab
    'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2000&auto=format&fit=crop'  // Mentorship/Guidance
  ];
  
  activeBannerIndex: number = 0;
  private bannerInterval: any;

  ngOnInit(): void {
    // Rotate banner every 5 seconds
    this.bannerInterval = setInterval(() => {
      this.activeBannerIndex = (this.activeBannerIndex + 1) % this.bannerImages.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.bannerInterval) {
      clearInterval(this.bannerInterval);
    }
  }

  // Section: What We Do – 4 Pillars
  pillarCards: CardItem[] = [
    {
      icon: '🧠',
      title: 'Mindset & Foundation (Building Strong Roots)',
      description: `• Early Start: We shift student thinking from "finding a job" to "solving a problem" right from the first year.
• Self-Awareness: Students learn to see opportunities in their own communities and surroundings.
• Emotional Strength: Building the resilience and mental toughness needed for the entrepreneurial journey.
• Creative Thinking: Developing a creative and problem-solving mindset that lasts a lifetime.`
    },
    {
      icon: '🏢',
      title: 'Industry & Career Exposure (Learning by Doing)',
      description: `• Real Projects: Students bridge the gap between books and the real world through internships and hands-on work.
• Learn from Experts: We bring in active professionals and practitioners to share real-world knowledge.
• Practical Skills: The focus is on solving actual industry challenges, not just getting a certificate.
• Beyond Grades: We ensure students understand how modern industries actually function.`
    },
    {
      icon: '🚀',
      title: 'Startup & Innovation Culture (Turning Campus into a Lab)',
      description: `• Live Labs: We transform regular college campuses into active spaces where teams build real products.
• Safe to Experiment: We provide local incubation so students can take risks and try out their ideas.
• Teamwork: Students learn to work together and prototype their solutions.
• Real Growth: We help turn simple college projects into high-growth startup ventures.`
    },
    {
      icon: '🤝',
      title: 'Community & Mentorship (Guidance from Leaders)',
      description: `• Strong Network: We connect students with successful alumni and local business leaders.
• Best of Both Worlds: We blend modern startup strategies with traditional Indian business wisdom.
• No One Walks Alone: Every founder gets the mentorship and connections they need to scale.
• Keeping Wealth Local: Our community focus ensures that businesses grow and create jobs within their own towns.`
    }
  ];
}
