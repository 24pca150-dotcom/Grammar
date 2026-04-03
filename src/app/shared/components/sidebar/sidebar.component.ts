import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleService } from '../../../core/services/module.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside class="fixed left-0 top-0 w-[240px] h-screen flex flex-col z-[100] border-r border-slate-100 p-6 bg-white overflow-y-auto">
      <div class="mb-8">
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
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">Active Modules</p>
        </div>

        <!-- Dynamic Loop for Real-time Modules -->
        <div *ngFor="let m of modules" class="flex flex-col gap-1 mb-2 group">
          <a [routerLink]="['/modules', m.id]" routerLinkActive="active" class="sidebar-nav-item">
            <span class="p-2 rounded-lg bg-slate-50 transition-colors icon-container group-hover:bg-primary group-hover:text-white">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            </span>
            <span class="truncate">{{m.name}}</span>
          </a>
        </div>

        <div *ngIf="modules.length === 0" class="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-100 opacity-40 text-center">
           <span class="text-[9px] font-black uppercase text-slate-400 italic">No modules active</span>
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
      @apply flex items-center gap-4 py-2.5 px-3 rounded-xl text-slate-500 font-bold text-sm transition-all hover:bg-slate-50 hover:text-slate-900;
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
export class SidebarComponent implements OnInit, OnDestroy {
  modules: any[] = [];
  user: any = null;
  private sub: Subscription = new Subscription();

  constructor(
    private moduleService: ModuleService, 
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.fetchModules();
    
    // Auto refresh when a new module is added from admin panel (experimental reactive update)
    this.sub.add(
      this.moduleService.moduleAdded$.subscribe(() => this.fetchModules())
    );
  }

  fetchModules() {
    this.moduleService.getModules().subscribe({
      next: (data) => {
        this.modules = data || [];
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error fetching modules', err)
    });
  }

  onSignOut() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
