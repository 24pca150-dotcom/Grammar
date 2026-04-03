import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-[240px] bg-white border-r border-slate-200 flex flex-col z-20">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/20">G</div>
            <div>
              <h1 class="font-black text-[14px] leading-tight uppercase tracking-tight">Grammar App</h1>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Admin Control Center</p>
            </div>
          </div>

          <nav class="flex flex-col gap-1.5">
            <div class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 mt-2 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Main Terminal
            </div>
            
            <a (click)="navigateTo('/admin/dashboard')" [class.active-link]="router.url === '/admin/dashboard'" class="nav-item group cursor-pointer">
              <span class="icon">📊</span>
              Dashboard
            </a>
            <a (click)="navigateTo('/admin/users')" [class.active-link]="router.url === '/admin/users'" class="nav-item group cursor-pointer">
              <span class="icon">👥</span>
              User Management
            </a>
            <a (click)="navigateTo('/admin/modules')" [class.active-link]="router.url === '/admin/modules'" class="nav-item group cursor-pointer">
              <span class="icon">📁</span>
              Modules
            </a>
            <a class="nav-item group opacity-50 cursor-not-allowed">
              <span class="icon">🧪</span>
              Test Management
            </a>
            <a class="nav-item group opacity-50 cursor-not-allowed">
              <span class="icon">📈</span>
              Analytics
            </a>
          </nav>

          <nav class="flex flex-col gap-2 mt-auto pt-10">
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span> Preferences
            </div>
            <a class="nav-item group">
              <span class="icon">⚙️</span>
              Settings
            </a>
            <a class="nav-item group">
              <span class="icon">❓</span>
              Support
            </a>
          </nav>
        </div>

        <!-- User Profile -->
        <div class="mt-auto p-4 border-t border-slate-100 bg-slate-50/50">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center font-black text-primary text-xs overflow-hidden">
               <img *ngIf="user?.name" [src]="'https://api.dicebear.com/7.x/initials/svg?seed=' + user.name" alt="Avatar">
            </div>
            <div class="flex flex-col min-w-0">
               <span class="text-[11px] font-black text-slate-900 truncate uppercase">{{ user?.name || 'Admin User' }}</span>
               <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">System {{ user?.role }}</span>
            </div>
            <button (click)="logout()" class="ml-auto w-7 h-7 rounded-lg hover:bg-rose-50 hover:text-rose-500 text-slate-400 transition-colors flex items-center justify-center">
               <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
         <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .nav-item {
      @apply flex items-center gap-4 px-4 py-3 rounded-xl text-[13px] font-black text-slate-500 uppercase tracking-wide transition-all hover:bg-slate-50 hover:text-primary;
    }
    .icon {
      @apply text-lg opacity-40 group-hover:opacity-100 transition-opacity;
    }
    .active-link {
      @apply bg-indigo-50 text-primary shadow-sm shadow-indigo-500/5;
    }
    .active-link .icon {
      @apply opacity-100;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 10px;
    }
  `]
})
export class AdminLayoutComponent implements OnInit {
  user: any;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
