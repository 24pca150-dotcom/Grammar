import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { GrammarService } from '../../core/services/grammar.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <!-- Sidebar remains the same but with dynamic Profile -->
      <aside class="w-[280px] bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div class="p-8">
          <div class="flex items-center gap-3 group cursor-pointer">
            <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
            </div>
            <div>
              <h1 class="text-lg font-bold text-slate-900 leading-tight">Grammar App</h1>
              <p class="text-[11px] font-medium text-slate-400 tracking-wide uppercase">Admin Control Center</p>
            </div>
          </div>
        </div>

        <nav class="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <div class="pb-4">
             <p class="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Main Menu</p>
             <a routerLink="/admin" (click)="loadData()" class="flex items-center gap-3 px-4 py-3.5 bg-indigo-50/80 rounded-2xl text-sm font-semibold text-indigo-700">
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
               Admin Panel
             </a>
             <div (click)="loadData()" class="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-2xl text-sm font-medium transition-all group cursor-pointer">
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
               Dashboard
             </div>
             <div (click)="loadData()" class="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-2xl text-sm font-medium transition-all group cursor-pointer">
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
               User Management
             </div>
          </div>
        </nav>

        <div class="p-6 border-t border-slate-100 flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-100">
              {{ currentUser?.name?.substring(0, 2).toUpperCase() || 'AD' }}
            </div>
            <div>
              <p class="text-sm font-bold text-slate-900 leading-none">{{ currentUser?.name || 'Admin' }}</p>
              <p class="text-[10px] font-semibold text-slate-400 uppercase mt-1">{{ currentUser?.role || 'Admin' }}</p>
            </div>
          </div>
          <button (click)="logout()" class="p-2 text-slate-400 hover:text-red-500 rounded-lg">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto custom-scrollbar animate-page-entrance">
        <div class="px-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20">
          <div>
            <h2 class="text-3xl font-black text-slate-900 tracking-tight">System Overview</h2>
            <p class="text-slate-500 font-medium mt-1">Real-time performance metrics and user engagement.</p>
          </div>
          <div class="flex items-center gap-3">
            <button class="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl">Export Report</button>
            <button (click)="loadData()" class="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl flex items-center gap-2 group shadow-lg shadow-indigo-200">
              <svg [class.animate-spin]="isLoading" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              {{ isLoading ? 'Refreshing...' : 'System Refresh' }}
            </button>
          </div>
        </div>

        <div class="px-10 pb-12 space-y-10">
          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div class="md:col-span-3 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all">
              <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                 <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              </div>
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Total Users</p>
              <h3 class="text-3xl font-black text-slate-900 mb-2">{{ stats?.totalUsers?.toLocaleString() || '...' }}</h3>
              <div class="flex items-center gap-1.5 text-emerald-500 font-bold text-sm">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                <span>{{ stats?.growth || '+0%' }}</span>
                <span class="text-slate-400 font-medium ml-1">{{ stats?.lastMonthComparison }}</span>
              </div>
            </div>

            <div class="md:col-span-3 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all">
              <div class="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Active Tests</p>
              <h3 class="text-3xl font-black text-slate-900 mb-2">{{ stats?.activeTests || '0' }}</h3>
              <div class="flex items-center gap-2 text-slate-400 font-bold text-sm">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>Currently live sessions</span>
              </div>
            </div>

            <!-- Chart Placeholder using dynamic values -->
            <div class="md:col-span-6 bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden relative">
               <div class="mb-8">
                  <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Global XP Flow</p>
                  <h3 class="text-xl font-bold text-slate-900">Scholarship Momentum</h3>
               </div>
               <div class="flex-1 flex items-end justify-between gap-4 mt-auto">
                  <div *ngFor="let val of chartData" [style.height.%]="val" class="flex-1 bg-indigo-50 rounded-xl relative group transition-all duration-500">
                    <div class="absolute inset-0 bg-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
               </div>
            </div>
          </div>

          <!-- User Management Table -->
          <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div class="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 class="text-xl font-bold text-slate-900 leading-none mb-2">User Management</h3>
                <p class="text-sm font-medium text-slate-400">Managing activity across {{ scholars.length }} active scholars.</p>
              </div>
              <div class="flex items-center gap-3">
                <input type="text" placeholder="Search scholars..." class="pl-11 pr-6 py-2.5 bg-slate-50 rounded-xl text-sm font-medium min-w-[280px]">
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th class="px-8 py-5">Scholar</th>
                    <th class="px-8 py-5 text-center">Status</th>
                    <th class="px-8 py-5">XP Level</th>
                    <th class="px-8 py-5">Current Module</th>
                    <th class="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr *ngFor="let user of scholars" class="hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <td class="px-8 py-6">
                      <div class="flex items-center gap-4">
                        <div [class]="'w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold text-sm ' + getAvatarColor(user.color)">
                          {{ user.initials }}
                        </div>
                        <div>
                          <p class="text-sm font-bold text-slate-900 leading-none">{{ user.name }}</p>
                          <p class="text-xs font-medium text-slate-400 mt-1">{{ user.email }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-8 py-6 text-center">
                      <span [class]="'px-3 py-1 text-[10px] font-bold uppercase rounded-full border ' + getStatusClass(user.status)">
                        {{ user.status }}
                      </span>
                    </td>
                    <td class="px-8 py-6">
                      <div class="flex flex-col gap-1.5 w-32">
                        <span class="text-[11px] font-bold text-slate-900">Level {{ user.level }}</span>
                        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div class="h-full bg-indigo-500 rounded-full" [style.width.%]="user.progress"></div>
                        </div>
                      </div>
                    </td>
                    <td class="px-8 py-6">
                      <p class="text-sm font-semibold text-slate-600">{{ user.module }}</p>
                    </td>
                    <td class="px-8 py-6 text-right">
                       <button class="p-2 text-slate-400 hover:text-indigo-600"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-6 border-t border-slate-50 flex items-center justify-between">
              <p class="text-xs font-medium text-slate-400">Total: {{ stats?.totalUsers?.toLocaleString() }} scholars</p>
              <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold">1</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  stats: any = {};
  scholars: any[] = [];
  chartData: number[] = [];
  isLoading = false;
  currentUser: any = null;

  constructor(
    private authService: AuthService, 
    private grammarService: GrammarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    
    // Parallel fetching
    this.grammarService.getAdminStats().subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error('Stats load failed', err)
    });

    this.grammarService.getAdminUsers().subscribe({
      next: (response) => this.scholars = response.data,
      error: (err) => console.error('Users load failed', err)
    });

    this.grammarService.getAnalyticsData().subscribe({
      next: (data) => {
        this.chartData = data.dataset;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Chart load failed', err);
        this.isLoading = false;
      }
    });
  }

  getAvatarColor(color: string) {
    const colors: any = {
      rose: 'bg-rose-50 text-rose-600 border-rose-100',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      orange: 'bg-orange-50 text-orange-600 border-orange-100',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-100'
    };
    return colors[color] || colors.indigo;
  }

  getStatusClass(status: string) {
    if (status === 'Active') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    return 'bg-slate-100 text-slate-400 border-slate-200';
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
