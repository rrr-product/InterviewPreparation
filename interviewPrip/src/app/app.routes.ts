import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home').then(c => c.HomeComponent) 
  },
  { 
    path: 'topics/:slug', 
    loadComponent: () => import('./features/topic/topic').then(c => c.TopicComponent) 
  },
  { 
    path: 'topics/:slug/questions/:questionId', 
    loadComponent: () => import('./features/question-detail/question-detail').then(c => c.QuestionDetailComponent) 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
