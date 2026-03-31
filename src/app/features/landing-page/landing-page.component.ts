import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-white min-h-screen overflow-hidden">
      <!-- Minimalist Header -->
      <nav #navbar class="h-[80px] border-b border-slate-100 flex items-center opacity-0 translate-y-[-10px] bg-white/80 backdrop-blur-md z-[1000] fixed w-full top-0">
        <div class="container flex justify-between items-center w-full">
          <div class="flex items-center gap-3 cursor-pointer" routerLink="/">
            <div class="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center text-xl font-bold font-sans">G</div>
            <span class="text-xl font-bold text-slate-900 tracking-tight uppercase italic font-black">GrammarHub<span class="text-primary italic font-black text-xl leading-none">.</span></span>
          </div>
          <div class="hidden lg:flex gap-12">
            <a routerLink="/" class="nav-link font-black text-[11px] uppercase tracking-widest italic opacity-50 hover:opacity-100 transition-opacity">Home</a>
            <a routerLink="/about" class="nav-link font-black text-[11px] uppercase tracking-widest italic opacity-50 hover:opacity-100 transition-opacity">About</a>
          </div>
          <div class="flex items-center gap-4">
            <button class="btn-ghost font-black text-[11px] uppercase tracking-widest italic" routerLink="/login">Log in</button>
            <button class="btn-primary" routerLink="/register">Get Started</button>
          </div>
        </div>
      </nav>

      <!-- Optimized Hero Section with Robust Seamless Ticker -->
      <section class="relative pt-32 lg:pt-36 lg:pb-32 bg-white mt-[80px]">
        <div class="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
          <img src="/images/hero-bg.png" class="w-full h-full object-cover">
        </div>

        <!-- NEW: TRUE INDUSTRIAL SEAMLESS TICKER (NO GAPS) -->
        <div #carouselContainer class="opacity-0 translate-y-[-10px] w-full mb-12 relative h-[100px] overflow-hidden group border-y border-slate-50 mt-4 py-4">
           <div #tickerTrack class="flex gap-8 h-full items-center whitespace-nowrap will-change-transform h-full px-4">
              
                <!-- Repeated instances to ensure no gaps even on ultra-wide screens -->
                 <div class="ticker-box min-w-[340px] h-full flex items-center shrink-0">
                  <div class="bg-slate-900 w-full h-full rounded-2xl p-5 flex items-center gap-4 border border-white/5 shadow-22xl">
                    <div class="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-lg shadow-lg">📡</div>
                    <div class="flex flex-col">
                       <span class="text-[7px] font-black text-primary uppercase tracking-[0.4rem] mb-1">Live Status</span>
                       <h4 class="text-[10px] font-bold text-white uppercase italic tracking-widest whitespace-nowrap font-black">Neural Parsing v4.2 : Online</h4>
                    </div>
                    <div class="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                </div>

                <div class="ticker-box min-w-[340px] h-full flex items-center shrink-0">
                  <div class="bg-indigo-50 w-full h-full rounded-2xl p-5 flex items-center gap-4 border border-indigo-100 shadow-xl">
                    <div class="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center text-lg shadow-sm border border-indigo-100">🎤</div>
                    <div class="flex flex-col">
                       <span class="text-[7px] font-black text-primary uppercase tracking-[0.4rem] mb-1">Module Mapping</span>
                       <h4 class="text-[10px] font-bold text-slate-900 uppercase italic tracking-widest whitespace-nowrap font-black">IELTS Speaking Simulation</h4>
                    </div>
                    <div class="ml-auto font-black text-indigo-400 text-xl tracking-tighter">/02</div>
                  </div>
                </div>

                <div class="ticker-box min-w-[340px] h-full flex items-center shrink-0">
                  <div class="bg-slate-50 w-full h-full rounded-2xl p-5 flex items-center gap-4 border border-slate-200 shadow-lg">
                    <div class="w-10 h-10 bg-white text-slate-800 rounded-lg flex items-center justify-center text-lg shadow-sm border border-slate-200">📊</div>
                    <div class="flex flex-col">
                       <span class="text-[7px] font-black text-slate-400 uppercase tracking-[0.4rem] mb-1">Success Lab</span>
                       <h4 class="text-[10px] font-bold text-slate-800 uppercase italic tracking-widest whitespace-nowrap font-black">98.4% Accuracy In Metrics</h4>
                    </div>
                    <div class="ml-auto font-black text-slate-300 text-xl tracking-tighter">/03</div>
                  </div>
                </div>

                <div class="ticker-box min-w-[340px] h-full flex items-center shrink-0">
                  <div class="bg-slate-900 w-full h-full rounded-2xl p-5 flex items-center gap-4 border border-white/5 shadow-2xl">
                    <div class="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-lg shadow-lg">📡</div>
                    <div class="flex flex-col">
                       <span class="text-[7px] font-black text-primary uppercase tracking-[0.4rem] mb-1">Live Status</span>
                       <h4 class="text-[10px] font-bold text-white uppercase italic tracking-widest whitespace-nowrap font-black">Neural Parsing v4.2 : Online</h4>
                    </div>
                    <div class="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                </div>

                <div class="ticker-box min-w-[340px] h-full flex items-center shrink-0">
                  <div class="bg-indigo-50 w-full h-full rounded-2xl p-5 flex items-center gap-4 border border-indigo-100 shadow-xl">
                    <div class="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center text-lg shadow-sm border border-indigo-100">🎤</div>
                    <div class="flex flex-col">
                       <span class="text-[7px] font-black text-primary uppercase tracking-[0.4rem] mb-1">Module Mapping</span>
                       <h4 class="text-[10px] font-bold text-slate-900 uppercase italic tracking-widest whitespace-nowrap font-black">IELTS Speaking Simulation</h4>
                    </div>
                    <div class="ml-auto font-black text-indigo-400 text-xl tracking-tighter">/02</div>
                  </div>
                </div>

                <div class="ticker-box min-w-[340px] h-full flex items-center shrink-0">
                  <div class="bg-slate-50 w-full h-full rounded-2xl p-5 flex items-center gap-4 border border-slate-200 shadow-lg">
                    <div class="w-10 h-10 bg-white text-slate-800 rounded-lg flex items-center justify-center text-lg shadow-sm border border-slate-200">📊</div>
                    <div class="flex flex-col">
                       <span class="text-[7px] font-black text-slate-400 uppercase tracking-[0.4rem] mb-1">Success Lab</span>
                       <h4 class="text-[10px] font-bold text-slate-800 uppercase italic tracking-widest whitespace-nowrap font-black">98.4% Accuracy In Metrics</h4>
                    </div>
                    <div class="ml-auto font-black text-slate-300 text-xl tracking-tighter">/03</div>
                  </div>
                </div>
                 
                <!-- More sets to ensure full screen coverage before the loop logic even triggers -->
                <div class="ticker-box min-w-[340px] h-full flex items-center shrink-0">
                  <div class="bg-slate-900 w-full h-full rounded-2xl p-5 flex items-center gap-4 border border-white/5 shadow-22xl">
                    <div class="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-lg shadow-lg">📡</div>
                  </div>
                </div>
                <div class="ticker-box min-w-[340px] h-full flex items-center shrink-0">
                  <div class="bg-indigo-50 w-full h-full rounded-2xl p-5 flex items-center gap-4 border border-indigo-100 shadow-xl">
                    <div class="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center text-lg shadow-sm border border-indigo-100">🎤</div>
                  </div>
                </div>

           </div>
           
           <!-- Shadow Fades -->
           <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
           <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>

        <div class="container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div #heroText class="flex flex-col items-start gap-8 opacity-0 translate-x-[-20px]">
            <h1 class="text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] uppercase italic font-black">
              Elevate your <br><span class="text-primary tracking-tighter">English mastery</span> with precision AI.
            </h1>
            <p class="text-xl text-slate-500 leading-relaxed max-w-xl font-medium italic opacity-70">
              Professional-grade grammar analysis and linguistic training modules for academic and institutional excellence. Built for the modern learner.
            </p>
            <div class="flex flex-wrap gap-4 mt-2">
              <button class="bg-primary text-white px-10 py-5 rounded-md font-bold text-lg hover:bg-primary-dark transition-all shadow-2xl shadow-indigo-500/20 active:scale-95 text-xl uppercase italic font-black tracking-widest" routerLink="/register">Join Platform</button>
              <button class="bg-white border border-slate-200 text-slate-700 px-10 py-5 rounded-md font-bold text-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95 text-xl uppercase italic font-black tracking-widest">Documentation</button>
            </div>
          </div>
          
          <div #heroImage class="relative w-full aspect-square rounded-2xl bg-slate-900 shadow-2xl overflow-hidden opacity-0 translate-x-[20px] ring-1 ring-white/10 group">
             <img src="/images/mockup.png" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000">
             <div class="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent pointer-events-none"></div>
             <div class="absolute bottom-8 left-8 flex items-center gap-4">
                <div class="w-4 h-4 rounded-full bg-green-500 animate-pulse border-2 border-white/30"></div>
                <span class="text-[12px] font-black uppercase text-white tracking-[0.5em] font-sans">GrammarHub Neural Pulse</span>
             </div>
          </div>
        </div>
      </section>

      <!-- Horizontal Marquee (Ticker) -->
      <section #ticker class="border-y border-slate-100 py-10 bg-white overflow-hidden opacity-0">
        <div class="flex items-center gap-20 animate-marquee whitespace-nowrap px-10">
          <span class="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em] italic opacity-50">Oxford Academy</span>
          <span class="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em] italic opacity-50">Stanford Linguistic Lab</span>
          <span class="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em] italic opacity-50">Global IELTS Center</span>
          <span class="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em] italic opacity-50">British Council Partner</span>
        </div>
      </section>

      <!-- Features Reveal -->
      <section class="py-32 bg-white relative z-10">
        <div class="container">
          <div #featureHeading class="flex flex-col items-center mb-20 text-center opacity-0 translate-y-[30px]">
             <h2 class="text-4xl font-bold text-slate-900 mb-6 tracking-tight uppercase italic font-black leading-none italic font-black">Linguistics infrastructure</h2>
             <p class="text-slate-500 text-lg max-w-2xl font-medium leading-relaxed italic">Advanced modules designed to scale your language skills through structured, AI-assisted practice.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
             <div class="feature-card card !p-10 group opacity-0 translate-y-[50px] hover:translate-y-[-5px]">
                <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-2xl mb-8 font-bold border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all font-black">01</div>
                <h3 class="text-xl font-bold text-slate-900 mb-4 tracking-tight uppercase italic font-black leading-none italic font-black font-black">Reading Labs</h3>
                <p class="text-slate-500 leading-relaxed mb-8 font-medium italic leading-none font-semibold">Adaptive comprehension modules that scale based on performance history.</p>
                <a class="text-primary font-black text-xs hover:underline cursor-pointer group-hover:translate-x-1 inline-block transition-transform uppercase tracking-widest italic font-black font-black">Explore Reading →</a>
             </div>

             <div class="feature-card card !p-10 group opacity-0 translate-y-[50px] hover:translate-y-[-5px]">
                <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-2xl mb-8 font-bold border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-all font-black">02</div>
                <h3 class="text-xl font-bold text-slate-900 mb-4 tracking-tight uppercase italic font-black leading-none italic font-black font-black">Writing Engine</h3>
                <p class="text-slate-500 leading-relaxed mb-8 font-medium italic leading-none font-semibold">Real-time correction infrastructure for institutional essay construction.</p>
                <a class="text-primary font-black text-xs hover:underline cursor-pointer group-hover:translate-x-1 inline-block transition-transform uppercase tracking-widest italic font-black font-black">Explore Writing →</a>
             </div>

             <div class="feature-card card !p-10 group opacity-0 translate-y-[50px] hover:translate-y-[-5px]">
                <div class="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center text-2xl mb-8 font-bold border border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white transition-all font-black">03</div>
                <h3 class="text-xl font-bold text-slate-900 mb-4 tracking-tight uppercase italic font-black leading-none italic font-black font-black">Listening Center</h3>
                <p class="text-slate-500 leading-relaxed mb-8 font-medium italic leading-none font-semibold">Immersive auditory comprehension with global accent phonemic mapping.</p>
                <a class="text-primary font-black text-xs hover:underline cursor-pointer group-hover:translate-x-1 inline-block transition-transform uppercase tracking-widest italic font-black font-black font-black">Explore Listening →</a>
             </div>

             <div class="feature-card card !p-10 group opacity-0 translate-y-[50px] hover:translate-y-[-5px]">
                <div class="w-12 h-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center text-2xl mb-8 font-bold border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-all font-black">04</div>
                <h3 class="text-xl font-bold text-slate-900 mb-4 tracking-tight uppercase italic font-black leading-none italic font-black font-black">Voice Mastery</h3>
                <p class="text-slate-500 leading-relaxed mb-8 font-medium italic leading-none font-semibold">Real-time speech analysis and articulatory mapping for oral precision.</p>
                <a class="text-primary font-black text-xs hover:underline cursor-pointer group-hover:translate-x-1 inline-block transition-transform uppercase tracking-widest italic font-black font-black">Explore Speaking →</a>
             </div>
          </div>
        </div>
      </section>
      
      <!-- Testimonials -->
      <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="container relative z-10">
          <div #reviewHeading class="flex flex-col items-center mb-20 text-center opacity-0 translate-y-[30px]">
             <div class="flex items-center gap-1 mb-6">
                @for(star of [1,2,3,4,5]; track star) { <span class="text-primary text-xl">★</span> }
             </div>
             <h2 class="text-4xl font-bold text-slate-900 mb-6 tracking-tight uppercase italic font-black leading-none italic font-black font-black">Institutional Excellence</h2>
             <p class="text-slate-500 text-lg max-w-2xl font-medium leading-relaxed italic">Trusted by linguistic scholars and academic centers worldwide for precision training.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
             <div class="review-card bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-8 opacity-0 translate-y-[40px] transition-all hover:shadow-xl hover:translate-y-[-5px]">
                <div class="flex gap-1">
                   @for(star of [1,2,3,4,5]; track star) { <span class="text-primary text-xs">★</span> }
                </div>
                <p class="text-[15px] text-slate-600 font-medium italic leading-[1.8] flex-1">
                   "The Reading Labs' adaptive density has transformed how our students engage with complex medical journals. The AI precision is unparalleled in the current SaaS market."
                </p>
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl overflow-hidden shadow-md">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" class="w-full h-full object-cover">
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[12px] font-black uppercase text-slate-900 leading-none mb-1">Dr. Marcus Vance</span>
                      <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Linguistic Research Center</span>
                   </div>
                </div>
             </div>

             <div class="review-card bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-8 opacity-0 translate-y-[40px] transition-all hover:shadow-xl hover:translate-y-[-5px]">
                <div class="flex gap-1">
                   @for(star of [1,2,3,4,5]; track star) { <span class="text-primary text-xs">★</span> }
                </div>
                <p class="text-[15px] text-slate-600 font-medium italic leading-[1.8] flex-1 font-black">
                   "Voice Mastery's phonemic mapping is incredibly accurate. Our students improved their articulation scores by 34% within the first month of institutional deployment."
                </p>
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl overflow-hidden shadow-md">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" class="w-full h-full object-cover">
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[12px] font-black uppercase text-slate-900 leading-none mb-1 italic">Prof. Sarah Jenkins</span>
                      <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Global IELTS Center</span>
                   </div>
                </div>
             </div>

             <div class="review-card bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-8 opacity-0 translate-y-[40px] transition-all hover:shadow-xl hover:translate-y-[-5px]">
                <div class="flex gap-1">
                   @for(star of [1,2,3,4,5]; track star) { <span class="text-primary text-xs">★</span> }
                </div>
                <p class="text-[15px] text-slate-600 font-medium italic leading-[1.8] flex-1">
                   "The Writing Engine offers a level of structural feedback that I haven't seen in any other platform. It doesn't just correct; it teaches formal academic cohesion."
                </p>
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl overflow-hidden shadow-md">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden" class="w-full h-full object-cover">
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[12px] font-black uppercase text-slate-900 leading-none mb-1 italic">Aiden Thompson</span>
                      <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Oxford Language Academy</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="py-24 bg-slate-900 text-white relative overflow-hidden group">
        <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-110 transition-transform duration-[20s] pointer-events-none"></div>
        <div class="container grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
           <div class="stat-item flex flex-col gap-2 opacity-0 translate-y-[20px]">
             <span class="text-4xl font-bold italic tracking-tighter">50K+</span>
             <span class="text-[10px] uppercase tracking-[0.4rem] font-black text-slate-500">Users Installed</span>
           </div>
           <div class="stat-item flex flex-col gap-2 opacity-0 translate-y-[20px]">
             <span class="text-4xl font-bold italic tracking-tighter">99.9%</span>
             <span class="text-[10px] uppercase tracking-[0.4rem] font-black text-slate-500">AI Accuracy</span>
           </div>
           <div class="stat-item flex flex-col gap-2 opacity-0 translate-y-[20px]">
             <span class="text-4xl font-bold italic tracking-tighter">4.9/5</span>
             <span class="text-[10px] uppercase tracking-[0.4rem] font-black text-slate-500">Net Promoter</span>
           </div>
           <div class="stat-item flex flex-col gap-2 opacity-0 translate-y-[20px]">
             <span class="text-4xl font-bold italic tracking-tighter">200+</span>
             <span class="text-[10px] uppercase tracking-[0.4rem] font-black text-slate-500">Modules Active</span>
           </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-32">
        <div class="container relative">
           <div #ctaContainer class="bg-indigo-50 border border-indigo-100 rounded-xl p-20 flex flex-col items-center opacity-0 scale-[0.95] shadow-2xl shadow-indigo-500/5">
              <h2 class="text-4xl font-bold text-slate-900 mb-4 tracking-tight uppercase italic font-black italic font-black font-black">Ready to begin your training?</h2>
              <p class="text-slate-500 text-lg mb-10 max-w-xl text-center leading-relaxed font-medium italic font-semibold">Join thousands of professionals using GrammarHub to communicate with precision.</p>
              <div class="flex flex-wrap justify-center gap-6">
                 <button class="btn-primary" routerLink="/register">Register Free Account</button>
                 <button class="btn-secondary" routerLink="/login">Log in to Dashboard</button>
              </div>
           </div>
        </div>
      </section>
      
      <!-- Footer -->
      <footer #footer class="bg-slate-50 border-t border-slate-200 pt-24 pb-12 opacity-0 translate-y-[20px]">
        <div class="container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div class="flex flex-col gap-6">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center text-lg font-bold font-sans">G</div>
                <span class="text-lg font-bold text-slate-900 tracking-tight uppercase italic font-black">GrammarHub<span class="text-primary italic font-black text-xl leading-none">.</span></span>
              </div>
              <p class="text-slate-500 text-sm leading-relaxed font-semibold italic opacity-60 font-black">
                Premier AI-driven linguistic training platform designed for academic and professional excellence. Precision grammar, immersive speech, and advanced reading labs.
              </p>
            </div>

            <div class="flex flex-col gap-6 border-l border-slate-200 pl-8">
              <h4 class="text-[10px] font-black uppercase tracking-[0.4rem] text-slate-400 font-sans tracking-[0.4rem]">Headquarters</h4>
              <p class="text-slate-600 text-sm font-bold uppercase italic italic tracking-tight font-black tracking-tighter italic">
                12 Innovation Way, Silicon Square<br>Cambridge, MA 02139<br>United States
              </p>
            </div>

            <div class="flex flex-col gap-6 border-l border-slate-200 pl-8">
              <h4 class="text-[10px] font-black uppercase tracking-[0.4rem] text-slate-400 font-sans tracking-[0.4rem]">Academy</h4>
              <ul class="flex flex-col gap-4 font-bold text-[11px] text-slate-600 uppercase tracking-widest italic leading-none font-black italic">
                <li><a class="hover:text-primary transition-colors cursor-pointer tracking-tighter">Reading Core</a></li>
                <li><a class="hover:text-primary transition-colors cursor-pointer tracking-tighter">Speech Labs</a></li>
                <li><a class="hover:text-primary transition-colors cursor-pointer tracking-tighter">Writing Engine</a></li>
              </ul>
            </div>

            <div class="flex flex-col gap-6 border-l border-slate-200 pl-8">
              <h4 class="text-[10px] font-black uppercase tracking-[0.4rem] text-slate-400 font-sans tracking-[0.4rem]">Governance</h4>
              <ul class="flex flex-col gap-4 font-bold text-[11px] text-slate-600 uppercase tracking-widest italic leading-none font-black italic">
                <li><a class="hover:text-primary transition-colors cursor-pointer tracking-tighter">Privacy Matrix</a></li>
                <li><a class="hover:text-primary transition-colors cursor-pointer tracking-tighter">Terms Hub</a></li>
                <li><a class="hover:text-primary transition-colors cursor-pointer tracking-tighter">Legal Vault</a></li>
              </ul>
            </div>
          </div>

          <div class="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
             <p class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">© 2026 GrammarHub Technologies Inc. All rights reserved.</p>
             <span class="text-[9px] font-black uppercase tracking-[0.3em] italic">Precision in communication.</span>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: 200%;
      animation: marquee 40s linear infinite;
    }
  `]
})
export class LandingPageComponent implements AfterViewInit {
  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChild('heroText') heroText!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;
  @ViewChild('featureHeading') featureHeading!: ElementRef;
  @ViewChild('reviewHeading') reviewHeading!: ElementRef;
  @ViewChild('ctaContainer') ctaContainer!: ElementRef;
  @ViewChild('footer') footerElement!: ElementRef;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  @ViewChild('tickerTrack') tickerTrack!: ElementRef;
  @ViewChild('ticker') ticker!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.initAnimations();

      // Delay initialization to ensure DOM layout is 100% correct
      setTimeout(() => this.initHorizontalLoop(), 200);
    }
  }

  // Official GSAP Horizontal Loop Helper (Refined)
  private initHorizontalLoop() {
    const items = gsap.utils.toArray('.ticker-box') as HTMLElement[];
    const speed = 1.0; // Seconds per 100 pixels

    // Total content width calculation
    let totalWidth = 0;
    items.forEach(el => totalWidth += el.offsetWidth + 32); // 32 is the gap-8

    // The loop logic
    gsap.set(this.tickerTrack.nativeElement, { x: 0 });

    // Industrial strength loop: Animate the track infinitely
    gsap.to(this.tickerTrack.nativeElement, {
      x: -totalWidth / 3, // Move one third of the content (assuming 3 full sets)
      duration: (totalWidth / 3) / 100 * speed,
      ease: 'none',
      repeat: -1,
      onRepeat: () => {
        // Force reset without visual jump
        gsap.set(this.tickerTrack.nativeElement, { x: 0 });
      }
    });
  }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to(this.navbar.nativeElement, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      .to(this.carouselContainer.nativeElement, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
      .to(this.heroText.nativeElement, { opacity: 1, x: 0, duration: 1 }, 0.4)
      .to(this.heroImage.nativeElement, { opacity: 1, x: 0, duration: 1 }, 0.6)
      .to(this.ticker.nativeElement, { opacity: 1, duration: 1 }, 0.8);

    gsap.to(this.featureHeading.nativeElement, {
      scrollTrigger: {
        trigger: this.featureHeading.nativeElement,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.to('.feature-card', {
      scrollTrigger: {
        trigger: '.feature-card',
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.to(this.reviewHeading.nativeElement, {
      scrollTrigger: {
        trigger: this.reviewHeading.nativeElement,
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.to('.review-card', {
      scrollTrigger: {
        trigger: '.review-card',
        start: 'top 85%',
      },
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.to('.stat-item', {
      scrollTrigger: {
        trigger: '.stat-item',
        start: 'top 90%',
      },
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power4.out'
    });

    gsap.to(this.ctaContainer.nativeElement, {
      scrollTrigger: {
        trigger: this.ctaContainer.nativeElement,
        start: 'top 85%',
      },
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power4.out'
    });

    gsap.to(this.footerElement.nativeElement, {
      scrollTrigger: {
        trigger: this.footerElement.nativeElement,
        start: 'top 90%',
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }
}
