import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Minimalist Header (Same as Landing) -->
      <nav class="h-[80px] border-b border-slate-100 flex items-center bg-white/80 backdrop-blur-md z-[1000] fixed w-full top-0">
        <div class="container flex justify-between items-center w-full">
          <div class="flex items-center gap-3 cursor-pointer" routerLink="/">
            <div class="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center text-xl font-bold font-sans">G</div>
            <span class="text-xl font-bold text-slate-900 tracking-tight uppercase italic font-black">GrammarHub<span class="text-primary italic font-black text-xl leading-none">.</span></span>
          </div>
          <div class="hidden lg:flex gap-10">
            <a routerLink="/" class="nav-link font-black text-[11px] uppercase tracking-widest italic opacity-50 hover:opacity-100 transition-opacity">Home</a>
            <a routerLink="/about" class="nav-link font-black text-[11px] uppercase tracking-widest italic opacity-100 hover:opacity-100 transition-opacity">About</a>
          </div>
          <div class="flex items-center gap-4">
             <button class="btn-ghost font-black text-[11px] uppercase tracking-widest italic" routerLink="/login">Log in</button>
             <button class="btn-primary" routerLink="/register">Get Started</button>
          </div>
        </div>
      </nav>

      <section class="pt-48 pb-32">
        <div class="container">
          <div class="max-w-3xl">
            <h1 class="text-6xl font-bold text-slate-900 mb-8 tracking-tight uppercase italic font-black italic">About GrammarHub</h1>
            <p class="text-xl text-slate-500 leading-relaxed font-medium italic mb-12 opacity-80">
              GrammarHub is a premier AI-driven linguistic training platform designed for academic and professional excellence. Precision grammar, immersive speech, and advanced reading labs—all powered by state-of-the-art neural mapping.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h3 class="text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 italic">Our Mission</h3>
                  <p class="text-slate-500 font-semibold italic text-sm leading-relaxed">To democratize professional-grade linguistic training through advanced AI instrumentation and structural analysis.</p>
               </div>
               <div>
                  <h3 class="text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 italic">Vision</h3>
                  <p class="text-slate-500 font-semibold italic text-sm leading-relaxed">Setting the global standard for digital communication precision and academic excellence in the modern era.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-24 bg-slate-50 border-y border-slate-100">
         <div class="container">
            <div class="flex flex-col md:flex-row justify-between items-center gap-12">
               <div class="flex flex-col gap-2">
                  <span class="text-4xl font-bold italic tracking-tighter text-slate-900">2026</span>
                  <span class="text-[10px] uppercase tracking-[0.4rem] font-black text-slate-400">Founded Institution</span>
               </div>
               <div class="flex flex-col gap-2">
                  <span class="text-4xl font-bold italic tracking-tighter text-slate-900">50K+</span>
                  <span class="text-[10px] uppercase tracking-[0.4rem] font-black text-slate-400">Total Scholars</span>
               </div>
               <div class="flex flex-col gap-2">
                  <span class="text-4xl font-bold italic tracking-tighter text-slate-900">99.9%</span>
                  <span class="text-[10px] uppercase tracking-[0.4rem] font-black text-slate-400">Accuracy Delta</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AboutComponent {}
