import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'Innovat Bharat — Transforming Tier-3 Colleges Into Startup Ecosystems',
      description: 'Innovat Bharat transforms Tier-3 and rural Indian colleges into startup ecosystems. We provide mentorship, real internships, and entrepreneurial training.',
      keywords: 'Innovat Bharat, tier 3 college startup, rural entrepreneurship India, campus innovation'
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    data: {
      title: 'About Us',
      description: 'Learn about our mission to build a Product Nation by 2047 through 1 million rural entrepreneurs.',
      keywords: 'Innovat Bharat mission, Mahesh Chillakuru, rural startup hub'
    }
  },
  {
    path: 'for-colleges',
    loadComponent: () => import('./pages/for-colleges/for-colleges.component').then(m => m.ForCollegesComponent),
    data: {
      title: 'For Colleges',
      description: 'Partner with us to transform your college into a center of excellence and innovation.',
      keywords: 'college partnership, startup incubation campus, tier 3 college placement'
    }
  },
  {
    path: 'for-students-parents',
    loadComponent: () => import('./pages/for-students-parents/for-students-parents.component').then(m => m.ForStudentsParentsComponent),
    data: {
      title: 'For Students & Parents',
      description: 'Discover how Innovat Bharat helps students earn while they learn and build real careers from their hometown.',
      keywords: 'earn while you learn, rural student internships, student entrepreneurship'
    }
  },
  {
    path: 'programs',
    loadComponent: () => import('./pages/programs/programs.component').then(m => m.ProgramsComponent),
    data: {
      title: 'Our Programs',
      description: 'Explore our flagship programs: Campus Ecosystem, Mindset Series, and Internship Pathways.',
      keywords: 'startup lab, innovation program, campus ecosystem program'
    }
  },
  {
    path: 'partners-mentors',
    loadComponent: () => import('./pages/partners-mentors/partners-mentors.component').then(m => m.PartnersMentorsComponent),
    data: {
      title: 'Partners & Mentors',
      description: 'Join our network of industry experts and professionals to shape the next generation of creators.',
      keywords: 'become a mentor, startup advisor, industry expert'
    }
  },
  {
    path: 'resources',
    loadComponent: () => import('./pages/resources/resources.component').then(m => m.ResourcesComponent),
    data: {
      title: 'Resources',
      description: 'Access blogs, case studies, and templates to help build your startup ecosystem.',
      keywords: 'startup resources, entrepreneurship templates, case studies'
    }
  },
  {
    path: 'collaborate',
    loadComponent: () => import('./pages/collaborate/collaborate.component').then(m => m.CollaborateComponent),
    data: {
      title: 'Collaborate',
      description: 'Companies, NGOs, and Institutes — partner with us to drive real change in rural India.',
      keywords: 'NGO collaboration, corporate social responsibility, rural impact'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: {
      title: 'Contact Us',
      description: 'Reach out to schedule an introduction session or join our community.',
      keywords: 'contact Innovat Bharat, invite us to college'
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
