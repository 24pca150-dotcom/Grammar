import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { gsap } from 'gsap';

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-5 max-w-[1300px] mx-auto min-h-screen bg-slate-50 relative overflow-hidden">
      
      <!-- Top Actions -->
      <header class="flex justify-between items-start mb-6 header-anim">
        <div>
          <h1 class="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">System Overview</h1>
          <p class="text-slate-500 font-bold text-[11px] uppercase tracking-widest opacity-50">Real-time performance metrics and user engagement.</p>
        </div>
        <div class="flex items-center gap-3">
           <button class="px-5 py-2 bg-white border border-slate-200 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">Export Report</button>
           <button (click)="refreshSystem()" class="px-5 py-2 bg-primary text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-xl shadow-indigo-500/20 active:scale-95">System Refresh</button>
        </div>
      </header>

      <!-- Stat Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
         <!-- Total Users Card -->
         <div class="bg-white p-6 rounded-[22px] border border-slate-100 shadow-sm card-anim transition-transform hover:scale-[1.02] duration-500 group">
            <div class="w-10 h-10 bg-indigo-50 text-primary rounded-xl flex items-center justify-center text-lg mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-sm border border-indigo-100/50">👤</div>
            <p class="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Total Users</p>
            <h3 class="text-2xl font-black text-slate-900 tracking-tight mb-3">{{ stats?.totalUsers ?? '0' }}</h3>
            <div class="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
               <span class="text-xs">↗</span> +12% vs last month
            </div>
         </div>

         <!-- Active Tests Card -->
         <div class="bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm card-anim transition-transform hover:scale-[1.02] duration-500 group">
            <div class="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-sm border border-indigo-100/50">🚀</div>
            <p class="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Active Tests</p>
            <h3 class="text-3xl font-black text-slate-900 tracking-tight mb-4">{{ stats?.activeTests ?? '0' }}</h3>
            <div class="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">
               <span class="animate-pulse w-2 h-2 bg-emerald-500 rounded-full"></span> Currently live sessions
            </div>
         </div>

         <!-- Scholarship Momentum Chart Mini -->
         <div class="bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm card-anim transition-transform hover:scale-[1.02] duration-500 relative">
            <div class="flex justify-between items-start mb-8">
               <div>
                  <p class="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Global XP Flow</p>
                  <h4 class="text-lg font-black text-slate-900 tracking-tight uppercase">Scholarship Momentum</h4>
               </div>
               <button class="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400">⋮</button>
            </div>
            
            <!-- Simple Mock Chart using CSS/Framer-style bars -->
            <div class="flex items-end justify-between h-[80px] gap-3 px-4">
               <div *ngFor="let val of chartData" 
                    [style.height.%]="val" 
                    class="w-full bg-slate-50 rounded-full group transition-all duration-700 hover:bg-primary relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{{val}}%</div>
               </div>
            </div>
         </div>
      </div>

      <!-- User Management Table Panel (Simplified for Dashboard) -->
      <section class="bg-white rounded-[28px] border border-slate-100 shadow-sm p-8 mb-10 panel-anim">
         <div class="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
               <h3 class="text-xl font-black text-slate-900 tracking-tight uppercase mb-1">User Management</h3>
               <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Managing permissions and activity across clusters.</p>
            </div>
            
            <div class="flex items-center gap-4 w-full md:w-auto">
               <div class="relative w-full md:w-[280px]">
                  <input type="text" placeholder="Search scholars..." class="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-[11px] font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-300 uppercase">
                  <span class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
               </div>
               <button class="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center transition-colors hover:bg-slate-100">⚙️</button>
            </div>
         </div>

         <div class="overflow-x-auto">
            <table class="w-full">
               <thead class="border-b border-slate-50">
                  <tr>
                     <th class="text-left py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">Scholar</th>
                     <th class="text-left py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">Status</th>
                     <th class="text-left py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">XP Level</th>
                     <th class="text-left py-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">Current Module</th>
                  </tr>
               </thead>
               <tbody class="divide-y divide-slate-50/50">
                  <tr *ngFor="let user of users" class="group hover:bg-slate-50/50 transition-colors">
                     <td class="py-8">
                        <div class="flex items-center gap-6">
                           <div class="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs shadow-sm bg-indigo-50 text-primary border border-indigo-100/50 overflow-hidden">
                              <img [src]="'https://api.dicebear.com/7.x/initials/svg?seed=' + user.name" alt="Avatar">
                           </div>
                           <div class="flex flex-col">
                              <span class="text-[14px] font-black text-slate-900 leading-tight uppercase group-hover:text-primary transition-colors">{{ user.name }}</span>
                              <span class="text-[10px] font-bold text-slate-400 lowercase">{{ user.email }}</span>
                           </div>
                        </div>
                     </td>
                     <td class="py-8">
                        <span class="px-5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border"
                              [ngClass]="user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'">
                           {{ user.status }}
                        </span>
                     </td>
                     <td class="py-8">
                        <div class="flex flex-col gap-2 w-[140px]">
                           <span class="text-[10px] font-black text-slate-900 uppercase">Level {{ user.level }}</span>
                           <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                              <div class="h-full bg-primary transition-all duration-1000" [style.width.%]="(user.level / 30) * 100"></div>
                           </div>
                        </div>
                     </td>
                     <td class="py-8">
                        <span class="text-[12px] font-bold text-slate-600 uppercase">{{ user.current_module }}</span>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>

         <!-- Pagination Mock -->
         <div class="flex justify-between items-center mt-12 pt-12 border-t border-slate-50">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Showing 1 to {{ users.length }} of {{ stats?.totalUsers || '0' }} scholars</p>
            <div class="flex gap-2">
               <button class="w-10 h-10 rounded-xl bg-primary text-white font-black text-xs shadow-lg shadow-indigo-500/20">1</button>
               <button class="w-10 h-10 rounded-xl hover:bg-slate-50 font-black text-xs text-slate-400 transition-colors">2</button>
               <button class="w-10 h-10 rounded-xl hover:bg-slate-50 font-black text-xs text-slate-400 transition-colors">3</button>
               <button class="w-10 h-10 rounded-xl hover:bg-slate-50 font-black text-xs text-slate-400 transition-colors">></button>
            </div>
         </div>
      </section>

      <!-- Bottom Featured Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <!-- AI Assistant -->
         <div class="bg-indigo-50 p-8 rounded-[32px] border border-indigo-100 shadow-sm relative overflow-hidden group opacity-0 panel-anim translate-y-[30px]" style="transition-delay: 100ms">
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-1000"></div>
            <div class="relative z-10 h-full flex flex-col items-start">
               <div class="w-14 h-14 bg-white text-primary rounded-[18px] flex items-center justify-center text-2xl mb-8 shadow-indigo-500/10 shadow-xl border border-indigo-100">✨</div>
               <h3 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">AI Content Assistant</h3>
               <p class="text-[12px] font-bold text-slate-500 leading-relaxed uppercase tracking-wide opacity-80 mb-8 max-w-[360px]">The AI is currently suggesting 12 new grammar exercise patterns based on recent user error trends in "Future Perfect" modules.</p>
               <button class="px-8 py-3.5 bg-white text-indigo-900 rounded-[18px] font-black text-[11px] uppercase tracking-[0.2em] shadow-indigo-500/5 shadow-xl hover:bg-primary hover:text-white transition-all duration-500 ring-1 ring-black/5 active:scale-95">Review Suggestions</button>
            </div>
         </div>

         <!-- Visual Intelligence -->
         <div class="bg-slate-900 p-8 rounded-[32px] border-none shadow-2xl relative overflow-hidden group opacity-0 panel-anim translate-y-[30px]" style="transition-delay: 200ms">
            <img src="https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2070&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div class="relative z-10 h-full flex flex-col justify-end items-start pt-24">
               <h3 class="text-2xl font-black text-white mb-2 uppercase tracking-tight">Visual Intelligence</h3>
               <p class="text-[10px] font-bold text-slate-300 uppercase tracking-[0.1em] opacity-60 mb-6 max-w-[300px]">Explore the deep behavioral mapping with our new 3D Cluster tool.</p>
               <div class="flex gap-4">
                  <div class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                  <span class="text-[8px] font-black text-primary uppercase tracking-[0.3em]">Live Intelligence Sync</span>
               </div>
            </div>
         </div>
      </div>
      
    </div>
  `,
  styles: [`
    :host { display: block; overflow-x: hidden; }
  `]
})
export class AdminOverviewComponent implements OnInit, AfterViewInit {
  stats: any;
  users: any[] = [];
  chartData = [30, 50, 40, 100, 70, 20, 65];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchStats();
    this.fetchUsers();
    this.fetchChartData();
  }

  fetchStats() {
    this.http.get('http://localhost:8000/api/admin/stats').subscribe({
      next: (data: any) => {
        console.log('Frontend received stats:', data);
        this.stats = { ...data };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Dashboard Stats API Link Failed:', err)
    });
  }

  refreshSystem() {
     console.log('Initiating manual link refresh...');
     this.fetchStats();
     this.fetchUsers();
     this.fetchChartData();
  }

  fetchChartData() {
    this.http.get<any>('http://localhost:8000/api/admin/xp-flow').subscribe({
      next: (res) => {
        this.chartData = [...res.dataset];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Chart Data Link Failed:', err)
    });
  }

  fetchUsers() {
    this.http.get<any>('http://localhost:8000/api/admin/users').subscribe({
      next: (res) => {
        // Show top 3 most active on the overview
        this.users = [...res.data.slice(0, 3)];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('User Fetch Failed:', err)
    });
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.header-anim', { opacity: 1, y: 0, duration: 1.2 })
      .to('.card-anim', { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 }, '-=0.8')
      .to('.panel-anim', { opacity: 1, y: 0, stagger: 0.2, duration: 1 }, '-=0.6');
  }
}
