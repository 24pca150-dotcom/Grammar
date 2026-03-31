import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="fixed top-0 left-0 w-full h-[76px] z-[1000] flex items-center border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div class="container-fluid px-8 flex justify-between items-center w-full">
        <div class="flex items-center gap-4 cursor-pointer group" routerLink="/">
          <div class="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition-all">G</div>
          <span class="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Grammar App</span>
        </div>
        
        <!-- Center Nav: Clean Navigation -->
        <div class="hidden lg:flex gap-1">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Dashboard</a>
          <a routerLink="/modules" routerLinkActive="active" class="nav-link">Academy</a>
          <a routerLink="/gamification/leaderboard" routerLinkActive="active" class="nav-link">Leaderboard</a>
          <a routerLink="/quiz" routerLinkActive="active" class="nav-link">Quizzes</a>
        </div>
        
        <!-- Right Side: User Stats (Duolingo Style) -->
        <div class="flex items-center gap-8" *ngIf="user">
          <!-- Streak -->
          <div class="flex items-center gap-2 cursor-help group" title="Daily Streak">
            <span class="text-xl group-hover:scale-110 transition-transform">🔥</span>
            <span class="text-sm font-black text-orange-500">{{ user.streak || 0 }}</span>
          </div>

          <!-- XP -->
          <div class="flex items-center gap-2 cursor-help group" title="Total XP">
            <span class="text-xl group-hover:scale-110 transition-transform">✨</span>
            <span class="text-sm font-black text-indigo-500">{{ (user.total_xp || 0) | number }}</span>
          </div>

          <!-- Hearts -->
          <div class="flex items-center gap-2 cursor-help group" title="Lives Remaining">
            <span class="text-xl group-hover:scale-125 transition-transform text-rose-500">❤️</span>
            <span class="text-sm font-black text-rose-500">{{ user.hearts || 0 }}</span>
          </div>

          <!-- Profile -->
          <div class="flex items-center gap-3 pl-6 border-l border-slate-100">
            <div class="text-right hidden sm:block">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Scholar</p>
              <p class="text-xs font-bold text-slate-900 leading-none">{{ user.name }}</p>
            </div>
            <div class="relative group cursor-pointer" (click)="isProfileOpen = !isProfileOpen">
              <img [src]="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.name" alt="Avatar" 
                   class="w-10 h-10 rounded-xl bg-slate-50 border-2 border-slate-100 hover:border-indigo-200 transition-all shadow-sm">
              
              <!-- Dropdown -->
              <div *ngIf="isProfileOpen" class="absolute right-0 top-full mt-4 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 py-4 animate-in fade-in zoom-in duration-200">
                <button (click)="onLogout()" class="w-full text-left px-4 py-2 text-xs font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-2 uppercase tracking-widest">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-link {
      @apply px-5 py-2 rounded-xl text-sm font-bold text-slate-500 border-2 border-transparent transition-all hover:text-slate-900;
    }
    .nav-link.active {
      @apply text-indigo-600;
    }
  `]
})
export class NavbarComponent implements OnInit {
  user: any;
  isProfileOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
