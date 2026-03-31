import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Params } from '@angular/router';
import { GrammarService } from '../../core/services/grammar.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-module-path',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-[700px] mx-auto py-20 px-8 relative min-h-screen">
      <!-- Back Header -->
      <header class="mb-14 flex items-center gap-6">
        <div (click)="goBack()" class="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-all text-slate-400 group">
           <svg class="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </div>
        <div>
           <h1 class="text-3xl font-black text-slate-900 tracking-tight uppercase italic">{{ moduleName }} Mastery</h1>
           <p class="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">Checkpoint Journey</p>
        </div>
      </header>

      <!-- Path Loop Grouped by Difficulty -->
      <div class="flex flex-col gap-24 relative" *ngIf="allLevels.length > 0">
        <div class="absolute top-0 bottom-0 w-2.5 bg-slate-100 rounded-full left-1/2 -ml-[5px] -z-10"></div>

        <section *ngFor="let diff of difficulties" class="flex flex-col gap-12" [ngClass]="{'hidden': getLevelsByDiff(diff).length === 0}">
          <!-- Difficulty Divider -->
          <div class="flex items-center justify-center">
             <div class="px-6 py-2 rounded-full border-2 border-slate-100 bg-white shadow-sm">
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">{{ diff }}</span>
             </div>
          </div>

          <div *ngFor="let level of getLevelsByDiff(diff); let i = index" class="w-full flex flex-col items-center">
             <div class="relative group">
                <!-- Level Circle -->
                <a [routerLink]="isUnlocked(level) ? ['/modules', moduleSlug, level.slug, 'practice'] : null"
                   [ngClass]="getLevelStatusClass(level)"
                   class="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl transition-all relative z-10 border-[6px] hover:ring-8 hover:ring-indigo-50 active:scale-95">
                  
                  {{ isUnlocked(level) ? getLevelIcon(moduleSlug) : '🔒' }}

                  <!-- Circular Progress Ring (Current Unit) -->
                  <svg *ngIf="isCurrent(level)" class="absolute -inset-3 w-[120px] h-[120px] -rotate-90">
                     <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" stroke-width="8"></circle>
                     <circle cx="60" cy="60" r="54" fill="none" stroke="#4f46e5" stroke-width="8" stroke-dasharray="340" stroke-dashoffset="0"></circle>
                  </svg>
                </a>

                <!-- Level Content Label -->
                <div class="absolute top-1/2 -translate-y-1/2 left-32 w-56 p-4">
                   <h4 class="font-black text-slate-800 text-[13px] uppercase tracking-wider italic mb-1">{{ level.name }}</h4>
                   <p class="text-[10px] font-bold text-slate-400 uppercase leading-relaxed max-w-[150px] italic">{{ level.description || 'Master this level to advance.' }}</p>
                </div>
             </div>
          </div>
        </section>

        <!-- Final Reward -->
        <div class="flex flex-col items-center mt-8">
           <div class="w-24 h-24 bg-slate-100 rounded-[32px] flex items-center justify-center text-4xl grayscale opacity-30 border-4 border-white shadow-xl rotate-12">🏁</div>
           <p class="mt-4 text-[10px] font-black uppercase text-slate-300 tracking-widest italic">End of Journey</p>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="allLevels.length === 0" class="py-32 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
         <div class="w-24 h-24 bg-slate-50 text-slate-200 rounded-[40px] flex items-center justify-center text-5xl mb-10 shadow-inner border border-slate-100 rotate-6 italic font-black">?</div>
         <h2 class="text-3xl font-black text-slate-800 mb-4 uppercase italic tracking-tighter">Checkpoint Empty</h2>
         <p class="text-slate-400 font-bold max-w-sm mx-auto uppercase text-[11px] tracking-widest leading-loose">The linguistics team has not yet mapped the progression path for this module. Please check back later for updates from headquarters.</p>
         <button routerLink="/dashboard" class="mt-12 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">Back to Hangar</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #fff; min-height: 100vh; }
    .level-unlocked { @apply bg-indigo-600 text-white border-indigo-700 cursor-pointer shadow-indigo-100; }
    .level-completed { @apply bg-emerald-500 text-white border-emerald-600 cursor-pointer shadow-emerald-500/10; }
    .level-locked { @apply bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed scale-90 opacity-60; }
  `]
})
export class ModulePathComponent implements OnInit {
  moduleSlug: string = '';
  moduleName: string = '';
  allLevels: any[] = [];
  completedLevelIds: number[] = [];
  difficulties = ['beginner', 'intermediate', 'advanced'];

  constructor(
    private route: ActivatedRoute,
    private grammarService: GrammarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.refreshProgress();
    this.route.params.subscribe((params: Params) => {
       this.moduleSlug = params['module'];
       this.moduleName = this.moduleSlug.charAt(0).toUpperCase() + this.moduleSlug.slice(1);
       this.fetchLevels();
    });
  }

  refreshProgress() {
    const user = this.authService.getUser();
    if (user && user.scores) {
       this.completedLevelIds = user.scores.map((s: any) => s.category_id);
    }
  }

  fetchLevels() {
    this.grammarService.getCategories().subscribe((cats: any[]) => {
        const currentMod = cats.find((c: any) => c.slug === this.moduleSlug);
        if (currentMod && currentMod.children) {
           // Sort children by order_index
           this.allLevels = currentMod.children.sort((a: any, b: any) => a.order_index - b.order_index);
        }
    });
  }

  getLevelsByDiff(diff: string) {
    return this.allLevels.filter(l => l.difficulty === diff);
  }

  isUnlocked(level: any): boolean {
    const sortedLevels = this.allLevels;
    const index = sortedLevels.findIndex(l => l.id === level.id);
    if (index === 0) return true;
    
    // Check if the PREVIOUS level in the overall sequence was completed
    const prevLevel = sortedLevels[index - 1];
    return this.completedLevelIds.includes(prevLevel.id);
  }

  isCompleted(level: any): boolean {
    return this.completedLevelIds.includes(level.id);
  }

  isCurrent(level: any): boolean {
    return this.isUnlocked(level) && !this.isCompleted(level);
  }

  getLevelStatusClass(level: any) {
    if (this.isCompleted(level)) return 'level-completed';
    if (this.isUnlocked(level)) return 'level-unlocked';
    return 'level-locked';
  }

  getLevelIcon(slug: string) {
     switch(slug) {
        case 'reading': return '📖';
        case 'writing': return '✍️';
        case 'listening': return '🎧';
        case 'speaking': return '🗣️';
        default: return '✅';
     }
  }

  goBack() {
    window.history.back();
  }
}
