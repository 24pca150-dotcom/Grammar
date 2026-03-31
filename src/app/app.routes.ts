import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  // Main App (with Sidebar & Navbar)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/overview/overview.component').then(m => m.DashboardOverviewComponent)
      },
      {
        path: 'modules/:module',
        loadComponent: () => import('./features/modules/module-path.component').then(m => m.ModulePathComponent)
      },
      {
        path: 'modules/:module/:level/practice',
        loadComponent: () => import('./features/modules/lesson-module.component').then(m => m.LessonModuleComponent)
      },
      {
        path: 'gamification/leaderboard',
        loadComponent: () => import('./features/dashboard/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent)
      },
      {
        path: 'gamification/streaks',
        loadComponent: () => import('./features/gamification/xp-streaks.component').then(m => m.XpStreaksComponent)
      },
      {
        path: 'quiz',
        loadComponent: () => import('./features/quiz/quiz-system/quiz-system.component').then(m => m.QuizSystemComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/dashboard/overview/overview.component').then(m => m.DashboardOverviewComponent)
      }
    ]
  },
  // Admin Panel
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard],
    children: [
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
