import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-for-students-parents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './for-students-parents.component.html',
  styleUrls: ['./for-students-parents.component.css']
})
export class ForStudentsParentsComponent {
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
      answer: 'While we work hard to connect students with internship opportunities, placements depend on student engagement, skill development, and available opportunities. We provide the ecosystem and support.',
      isOpen: false
    },
    {
      question: 'What if my college is not part of Innovat Bharat?',
      answer: 'Encourage your college administration to reach out to us! We\'re actively expanding to more institutions. Individual students can also follow our resources and community updates.',
      isOpen: false
    },
    {
      question: 'Do students need technical backgrounds?',
      answer: 'No. Our ecosystem serves students from all streams—engineering, commerce, science, agriculture, arts. We provide domain-relevant skills and opportunities for everyone.',
      isOpen: false
    },
    {
      question: 'How do parents track student progress?',
      answer: 'We maintain transparency through regular updates, progress reports, and opportunities for parent engagement. Parents can see tangible outcomes through projects, internships, and skill development.',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
