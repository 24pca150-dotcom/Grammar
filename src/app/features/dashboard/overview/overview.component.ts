import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { GrammarService } from '../../../core/services/grammar.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="flex flex-col gap-4 max-w-[1300px] mx-auto pb-10">
      
      <!-- Top Profile Header -->
      <header #header class="flex flex-row justify-between items-center opacity-0 translate-y-[-10px]">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 mb-2 tracking-tight italic">Welcome back, {{ user?.name || 'Scholar' }}.</h1>
          <p class="text-slate-500 font-semibold tracking-tight italic">You've mastered {{ completedCount }} modules so far.</p>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="flex flex-col items-end">
            <span class="text-[10px] font-black uppercase text-primary tracking-widest italic">Scholar Status</span>
            <span class="text-sm font-bold text-slate-900 lowercase italic opacity-40">{{ user?.email }}</span>
          </div>
          <div class="w-12 h-12 rounded-xl overflow-hidden shadow-lg border-2 border-slate-50 transition-transform hover:scale-110">
             <img [src]="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user?.name" class="w-full h-full object-cover">
          </div>
        </div>
      </header>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Course Progress Card -->
        <div class="stat-card bg-white p-5 rounded-[22px] border border-slate-50 shadow-sm relative opacity-0 translate-y-[20px]">
           <div class="flex justify-between items-start mb-6">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Course Progress</span>
              <span class="text-primary text-xl">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </span>
           </div>
           <div class="flex flex-col gap-4">
              <span class="text-4xl font-bold text-slate-900 tracking-tight italic">{{ progress }}%</span>
              <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                 <div #progressFill class="h-full bg-primary rounded-full transition-all duration-1000" [style.width.%]="progress"></div>
              </div>
           </div>
        </div>

        <!-- XP Card -->
        <div class="stat-card bg-white p-6 rounded-[28px] border border-slate-50 shadow-sm opacity-0 translate-y-[20px]">
           <div class="flex justify-between items-start mb-6">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total XP Earned</span>
              <span class="text-primary text-xl">🎖️</span>
           </div>
           <div class="flex flex-col gap-2">
              <span class="text-2xl font-bold text-slate-900 tracking-tight italic">{{ totalXP }}</span>
              <span class="text-[10px] font-bold text-primary uppercase tracking-widest italic">Ranked Top #{{ (totalXP % 100) + 1 }}</span>
           </div>
        </div>

        <!-- Streak Card -->
        <div class="stat-card bg-white p-6 rounded-[28px] border border-slate-50 shadow-sm opacity-0 translate-y-[20px]">
           <div class="flex justify-between items-start mb-6">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Current Streak</span>
              <span class="text-primary text-xl">🔥</span>
           </div>
           <div class="flex flex-col gap-4">
              <span class="text-4xl font-bold text-slate-900 tracking-tight italic">{{ streak }} Days</span>
              <div class="flex gap-1.5 overflow-hidden">
                  <div *ngFor="let i of [1,2,3,4,5,6,7]" 
                       class="h-1.5 flex-1 rounded-full transition-all"
                       [ngClass]="i <= streak ? 'bg-primary shadow-sm shadow-indigo-500/20' : 'bg-slate-100'"></div>
              </div>
           </div>
        </div>
      </div>

      <!-- Quick Access Modules -->
      <section>
         <div class="flex justify-between items-end mb-8 opacity-0 translate-y-[10px] section-title">
            <h2 class="text-lg font-black text-slate-900 tracking-tight uppercase italic">Target Modules</h2>
            <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest hidden md:block">Updated from Headquarters</p>
         </div>

         <!-- Empty State -->
         <div *ngIf="categories.length === 0" class="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[32px] p-24 flex flex-col items-center justify-center text-center opacity-0 translate-y-[20px] module-card">
            <div class="w-20 h-20 bg-white text-slate-300 rounded-[24px] flex items-center justify-center text-4xl shadow-sm mb-8 rotate-3 italic font-black ring-1 ring-slate-100">📥</div>
            <h3 class="text-2xl font-black text-slate-800 mb-2 uppercase italic tracking-tight">System Empty</h3>
            <p class="text-sm text-slate-400 font-medium max-w-xs mx-auto italic uppercase tracking-wider">No training modules have been deployed by the administrator headquarters yet.</p>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" *ngIf="categories.length > 0">
            <div *ngFor="let category of categories" 
                 [routerLink]="['/modules', category.slug]" 
                 class="module-card group cursor-pointer opacity-0 translate-y-[20px]">
               <div class="aspect-[4/3] rounded-[32px] overflow-hidden relative mb-4 ring-1 ring-slate-100 bg-slate-50">
                  <ng-container [ngSwitch]="category.slug.toLowerCase()">
                    <img *ngSwitchCase="'reading'" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <img *ngSwitchCase="'writing'" src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <img *ngSwitchCase="'listening'" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <img *ngSwitchCase="'speaking'" src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=400" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div *ngSwitchDefault class="w-full h-full flex items-center justify-center text-4xl bg-indigo-50 text-primary italic font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity">
                      {{ category.name[0] }}
                    </div>
                  </ng-container>
                  <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div class="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-slate-800 text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-sm ring-1 ring-black/5">Active</div>
               </div>
               <div class="px-3">
                  <h4 class="font-black text-slate-900 text-[14px] leading-tight uppercase italic tracking-wide group-hover:text-primary transition-colors">{{ category.name }}</h4>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{{ category.description || (category.slug + ' mastery') }}</p>
               </div>
            </div>
         </div>
      </section>

      <!-- Charts & Goals Section -->
         <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6" *ngIf="categories.length > 0">
            <!-- Daily Activity Placeholder -->
            <section class="opacity-0 translate-y-[20px] chart-panel">
               <div class="bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm h-full">
                  <div class="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                     <h3 class="font-black text-slate-900 text-md uppercase italic tracking-tight">Linguistic Metrics</h3>
                  <div class="flex items-center gap-2">
                     <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                     <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Realtime Data</span>
                  </div>
               </div>
               
               <div class="h-[300px] flex items-end justify-between px-10 relative">
                  <!-- Simulated Chart Pillars -->
                  <div *ngFor="let day of ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; let i = index" class="flex flex-col items-center gap-4 group">
                     <div class="w-2 bg-slate-50 rounded-full relative overflow-hidden transition-all group-hover:w-3" [style.height.px]="40 + (i * 25) % 150">
                        <div class="absolute bottom-0 w-full bg-slate-100 rounded-full group-hover:bg-primary transition-colors" [style.height.%]="20 + (i * 10) % 80"></div>
                     </div>
                     <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest italic" [ngClass]="{'text-primary': day === 'Fri'}">{{ day }}</span>
                  </div>
               </div>
            </div>
         </section>

         <!-- Mastery Goals Sidebar -->
         <section class="opacity-0 translate-x-[20px] goal-panel">
            <div class="bg-slate-900 p-6 rounded-[24px] border-none shadow-2xl relative overflow-hidden group h-full">
               <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
               <div class="relative z-10">
                 <h3 class="font-black text-white text-lg mb-8 uppercase italic tracking-tight border-b border-white/5 pb-4">Special Ops</h3>
                 
                 <div class="flex flex-col gap-8 mb-12">
                    <div class="flex items-center gap-5 group/item">
                       <div class="w-12 h-12 bg-white/5 text-rose-500 rounded-2xl flex items-center justify-center text-xl border border-white/10 group-hover/item:bg-white/10 transition-colors">📓</div>
                       <div>
                          <h5 class="text-sm font-black text-white leading-tight uppercase italic opacity-90">Subjunctive</h5>
                          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">In Progress</p>
                       </div>
                    </div>

                    <div class="flex items-center gap-5 group/item">
                       <div class="w-12 h-12 bg-white/5 text-primary rounded-2xl flex items-center justify-center text-xl border border-white/10 group-hover/item:bg-white/10 transition-colors">📐</div>
                       <div>
                          <h5 class="text-sm font-black text-white leading-tight uppercase italic opacity-90">Inversion</h5>
                          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Awaiting Sync</p>
                       </div>
                    </div>
                 </div>

                 <a class="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors cursor-pointer italic group-hover:translate-x-1 duration-300">
                    HQ Communications
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 </a>
               </div>
            </div>
         </section>
      </div>
      
    </div>
  `,
  styles: [`
    :host { display: block; background: #fff; min-height: 100vh; }
  `]
})
export class DashboardOverviewComponent implements AfterViewInit, OnInit {
  @ViewChild('header') header!: ElementRef;
  @ViewChild('progressFill') progressFill!: ElementRef;

  categories: any[] = [];
  user: any = null;
  totalXP = 0;
  streak = 0;
  progress = 0;
  completedCount = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private grammarService: GrammarService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user) {
      this.totalXP = this.user.xp || 0;
      this.streak = this.user.streak || 0;
      this.completedCount = this.user.scores?.length || 0;
      this.progress = Math.min(100, Math.round((this.completedCount / 10) * 100)); // Arbitrary 10 for demo
    }
    this.fetchCategories();
  }

  fetchCategories() {
    this.grammarService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
        // Re-trigger animation if data comes later
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.initAnimations(), 100);
        }
      },
      error: (err) => console.error('Error fetching categories', err)
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    if (!isPlatformBrowser(this.platformId) || !this.header) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Animate header always
    tl.to(this.header.nativeElement, { opacity: 1, y: 0, duration: 1 });

    // Animate stats cards always
    tl.to('.stat-card', { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }, '-=0.6');

    // Only animate category-dependent sections if categories exist
    if (this.categories.length > 0) {
      tl.to('.section-title', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.module-card', { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 }, '-=0.3')
        .to('.chart-panel', { opacity: 1, y: 0, duration: 1 }, '-=0.5')
        .to('.goal-panel', { opacity: 1, x: 0, duration: 1 }, '-=0.8');
    } else {
      // Animate empty state if visible
      tl.to('.section-title', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
      if (document.querySelector('.module-card')) {
        tl.to('.module-card', { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');
      }
    }
  }
}
