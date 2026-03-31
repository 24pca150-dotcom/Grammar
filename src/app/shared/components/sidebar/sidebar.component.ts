import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GrammarService } from '../../../core/services/grammar.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside class="fixed left-0 top-0 w-[280px] h-screen flex flex-col z-[100] border-r border-slate-100 p-8 bg-white overflow-y-auto">
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-1">
          <div class="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center text-xl font-bold font-sans shadow-lg shadow-indigo-500/20">G</div>
          <span class="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Grammar App</span>
        </div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-11">Scholar: {{user?.name || 'Guest'}}</p>
      </div>

      <div class="flex-1 flex flex-col gap-2">
        <!-- Main Dashboard Link -->
        <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar-nav-item">
          <span class="p-2 rounded-lg bg-slate-50 transition-colors icon-container">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          </span>
          <span>Dashboard</span>
        </a>

        <div class="mt-4 mb-2">
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Modules</p>
        </div>

        <!-- Dynamic Loop for Reading, Writing, Listening, Speaking -->
        <div *ngFor="let category of categories" class="flex flex-col gap-1 mb-2">
          <a [routerLink]="['/modules', category.slug]" routerLinkActive="active" class="sidebar-nav-item">
            <span class="p-2 rounded-lg bg-slate-100/50 transition-colors icon-container">
              <ng-container [ngSwitch]="category.slug.toLowerCase()">
                <svg *ngSwitchCase="'reading'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                <svg *ngSwitchCase="'writing'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                <svg *ngSwitchCase="'listening'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15L4 14a1 1 0 010-2l1.586-1L7 10h4l3-3v10l-3-3H7l-1.414-1z"></path></svg>
                <svg *ngSwitchCase="'speaking'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                <svg *ngSwitchDefault class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </ng-container>
            </span>
            <span>{{category.name}}</span>
          </a>
          
        </div>

        <!-- Extra Gamification Item -->
        <a routerLink="/gamification/leaderboard" routerLinkActive="active" class="sidebar-nav-item mt-4 border-t border-slate-50 pt-6">
          <span class="p-2 rounded-lg bg-amber-50 text-amber-500 transition-colors icon-container">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          </span>
          <span>Global Leaderboard</span>
        </a>
      </div>

      <!-- Start Daily Challenge & Logout -->
      <div class="mt-auto flex flex-col gap-6">
        <button class="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          Daily Challenge
        </button>

        <div class="flex flex-col gap-2 pt-6 border-t border-slate-50">
          <button (click)="onSignOut()" class="sidebar-nav-item w-full text-left text-rose-400 hover:text-rose-600 !py-2 hover:bg-rose-50/50">
            <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span class="text-xs font-black uppercase tracking-widest ml-4">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar-nav-item {
      @apply flex items-center gap-4 py-3 px-4 rounded-xl text-slate-500 font-bold text-sm transition-all hover:bg-slate-50 hover:text-slate-900;
    }
    .sidebar-nav-item.active {
      @apply bg-indigo-50 text-primary;
    }
    .sidebar-nav-item.active .icon-container {
      @apply bg-white text-primary shadow-sm;
    }
    .sub-item {
      @apply text-[11px] font-black text-slate-400 hover:text-slate-600 py-1 transition-colors uppercase tracking-[0.1em];
    }
    .active-subitem {
      @apply text-primary font-black scale-105 origin-left;
    }
  `]
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];
  user: any = null;

  constructor(
    private grammarService: GrammarService, 
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.fetchCategories();
  }

  fetchCategories() {
    this.grammarService.getCategories().subscribe({
      next: (data) => {
        this.categories = data || [];
        this.cd.detectChanges(); // Use this to force display on load
      },
      error: (err) => console.error('Error fetching categories', err)
    });
  }

  onSignOut() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
