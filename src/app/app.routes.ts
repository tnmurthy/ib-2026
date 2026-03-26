import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'ecosystem',
    loadComponent: () => import('./pages/ecosystem/ecosystem.component').then(m => m.EcosystemComponent)
  },
  {
    path: 'for-colleges',
    loadComponent: () => import('./pages/for-colleges/for-colleges.component').then(m => m.ForCollegesComponent)
  },
  {
    path: 'for-students-parents',
    loadComponent: () => import('./pages/for-students-parents/for-students-parents.component').then(m => m.ForStudentsParentsComponent)
  },
  {
    path: 'programs',
    loadComponent: () => import('./pages/programs/programs.component').then(m => m.ProgramsComponent)
  },
  {
    path: 'partners-mentors',
    loadComponent: () => import('./pages/partners-mentors/partners-mentors.component').then(m => m.PartnersMentorsComponent)
  },
  {
    path: 'resources',
    loadComponent: () => import('./pages/resources/resources.component').then(m => m.ResourcesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
