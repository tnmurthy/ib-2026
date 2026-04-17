import { Component } from '@angular/core';
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
export class HomeComponent {

  // Section: What We Do – 4 Pillars
  pillarCards: CardItem[] = [
    {
      icon: '🧠',
      title: 'Mindset & Foundation',
      description: 'We start early to shift student thinking from "finding a job" to "solving a problem." By building a strong mental foundation in the first year, students learn to see opportunities in their surroundings. This clarity helps them develop the resilience and creative thinking needed to build a lifelong entrepreneurial path.'
    },
    {
      icon: '🏢',
      title: 'Industry & Career Exposure',
      description: 'Students bridge the gap between books and reality through hands-on projects and internships. We bring in active professionals and practitioners to share real-world knowledge. This exposure ensures learners understand how modern industries work, allowing them to apply technical skills to actual challenges rather than just chasing academic certificates or grades.'
    },
    {
      icon: '🚀',
      title: 'Startup & Innovation Culture',
      description: 'We turn campuses into active labs where student teams build real products. By providing local incubation and support, we create a safe space for experimentation. This culture encourages students to take risks, prototype their ideas, and work together, transforming a simple college project into a potential high-growth startup venture.'
    },
    {
      icon: '🤝',
      title: 'Community & Mentorship',
      description: 'We connect students with a powerful network of successful alumni and local business leaders. By blending modern startup strategies with traditional business wisdom, students receive balanced guidance. This community ensures that no founder walks alone, providing the mentorship and connections necessary to scale their business and keep wealth local.'
    }
  ];
}
