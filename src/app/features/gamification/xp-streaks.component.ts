import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-xp-streaks',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="flex flex-col gap-10 max-w-[1240px] mx-auto pb-20">
      
      <!-- Streaks Header -->
      <header #header class="flex flex-col md:flex-row justify-between lg:items-center gap-8 border-b border-slate-50 pb-10 opacity-0 translate-y-[-10px]">
        <div>
           <div class="flex items-center gap-2 mb-4">
              <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Gamification Core</span>
              <span class="text-slate-200">/</span>
              <span class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">XP Streak Tracking</span>
           </div>
           <h1 class="text-4xl font-bold text-slate-900 mb-2 tracking-tight italic uppercase italic">Consistent Scholarship</h1>
           <p class="text-slate-500 font-semibold tracking-tight">Your streak reflects your commitment to the linguistic laboratory.</p>
        </div>
        
        <div class="flex items-center gap-6">
           <div class="p-6 bg-white border border-slate-50 shadow-xl shadow-indigo-500/5 rounded-3xl flex items-center gap-5">
              <span class="text-3xl animate-bounce">🔥</span>
              <div class="flex flex-col">
                 <span class="text-2xl font-black text-slate-900 tracking-tighter italic font-black uppercase">14 Days</span>
                 <span class="text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase">Active Streak</span>
              </div>
           </div>
        </div>
      </header>

      <div class="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-12">
         <!-- Calendar / Streak Area -->
         <main class="flex flex-col gap-10 opacity-0 translate-x-[-20px] streak-area">
            
            <div class="bg-white p-12 rounded-[48px] border border-slate-50 shadow-sm relative group">
               <div class="flex justify-between items-center mb-12">
                  <h3 class="text-xl font-bold text-slate-900 tracking-tight uppercase italic font-black">March 2026 Progression</h3>
                  <div class="flex gap-2">
                     <button class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-xs hover:bg-white hover:text-primary transition-all">←</button>
                     <button class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-xs hover:bg-white hover:text-primary transition-all">→</button>
                  </div>
               </div>

               <!-- Calendar Mock -->
               <div class="grid grid-cols-7 gap-6 text-center">
                  @for (day of days; track day) {
                     <div class="text-[10px] font-black uppercase tracking-widest text-slate-300 italic mb-4">{{day}}</div>
                  }
                  
                  <!-- Leading empty days -->
                  @for (i of [1,2,3,4,5]; track i) { <div class="h-20"></div> }

                  @for (date of dates; track date) {
                     <div [class]="(date <= 14 ? 'bg-primary text-white shadow-xl shadow-indigo-500/20 active:scale-95' : 'bg-slate-50 text-slate-300 grayscale opacity-40') + ' h-20 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border border-transparent hover:border-indigo-100 group relative'">
                        <span class="text-sm font-black italic">{{date}}</span>
                        @if(date <= 14) {
                           <span class="text-[8px] font-bold uppercase tracking-tighter opacity-40">+450XP</span>
                           <div class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></div>
                        }
                     </div>
                  }
               </div>

               <div class="mt-16 p-8 bg-slate-900 rounded-[32px] border-none shadow-2xl relative overflow-hidden flex justify-between items-center">
                  <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                  <div class="relative z-10">
                     <h4 class="text-white text-lg font-bold mb-1 italic font-black">Streak Freeze Active</h4>
                     <p class="text-white/40 text-[11px] font-bold uppercase tracking-widest leading-none">Protects your progress for 24 hours.</p>
                  </div>
                  <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl animate-pulse">❄️</div>
               </div>
            </div>

         </main>

         <!-- Milestone Sidebar Area -->
         <aside class="flex flex-col gap-8 sidebar-area opacity-0 translate-x-[20px]">
            <section class="bg-white p-10 rounded-[32px] border border-slate-50 shadow-sm">
               <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-50 pb-4">Upcoming Milestones</h3>
               <div class="flex flex-col gap-10">
                  <div class="flex items-center gap-5 group cursor-pointer hover:translate-x-1 transition-all">
                     <div class="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100">🔥</div>
                     <div>
                        <h5 class="text-[12px] font-bold text-slate-900 leading-tight">21 Day Streak</h5>
                        <p class="text-[10px] font-bold text-primary italic uppercase tracking-tighter leading-none mt-1">Unlock "Firebrand" Title</p>
                     </div>
                  </div>
                  <div class="flex items-center gap-5 group cursor-pointer hover:translate-x-1 transition-all">
                     <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl opacity-20 group-hover:opacity-40 transition-all">🥇</div>
                     <div>
                        <h5 class="text-[12px] font-bold text-slate-400 leading-tight">30 Day Streak</h5>
                        <p class="text-[10px] font-bold text-slate-300 italic uppercase tracking-tighter leading-none mt-1">Unlock "Platinum Tier"</p>
                     </div>
                  </div>
               </div>
            </section>

            <section class="bg-indigo-50 p-10 rounded-[32px] border border-indigo-100 shadow-sm">
               <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 italic">Streak Bonuses</h3>
               <ul class="flex flex-col gap-4">
                  <li class="flex items-center gap-3 text-[11px] font-bold text-slate-700 italic">
                     <span class="text-primary">✦</span> XP Multiplier: 1.2x Active
                  </li>
                  <li class="flex items-center gap-3 text-[11px] font-bold text-slate-700 italic">
                     <span class="text-primary">✦</span> Daily Challenge Bonus
                  </li>
                  <li class="flex items-center gap-3 text-[11px] font-bold text-slate-700 italic opacity-40">
                     <span class="text-slate-200">✦</span> Elite Shield Access (L7 Required)
                  </li>
               </ul>
            </section>
         </aside>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class XpStreaksComponent implements AfterViewInit {
  @ViewChild('header') header!: ElementRef;
  
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dates = Array.from({length: 31}, (_, i) => i + 1);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to(this.header.nativeElement, { opacity: 1, y: 0, duration: 1 })
      .to('.streak-area', { opacity: 1, x: 0, duration: 1 }, '-=0.6')
      .to('.sidebar-area', { opacity: 1, x: 0, duration: 1 }, '-=0.8');
  }
}
