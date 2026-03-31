import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { GrammarService } from '../../core/services/grammar.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-lesson-module',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-[800px] mx-auto min-h-screen flex flex-col py-12 px-6">
      <!-- Header / Progress -->
      <header class="flex items-center gap-6 mb-16">
        <button (click)="goBack()" class="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-indigo-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(79,70,229,0.3)]" [style.width.%]="progress()"></div>
        </div>
        <div class="flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-xl text-rose-500 font-black text-sm">
           <span>❤️</span> {{ hearts() }}
        </div>
      </header>

      <main class="flex-1 flex flex-col" *ngIf="!showResult()">
        <div *ngIf="currentQuestion()" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 class="text-2xl font-black text-slate-800 mb-8 tracking-tight">{{ currentQuestion().question_text }}</h2>
          
          <!-- Media if any -->
          <div *ngIf="currentQuestion().image_url" class="mb-8 rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-100 max-h-[250px]">
             <img [src]="currentQuestion().image_url" class="w-full h-full object-cover">
          </div>

          <div *ngIf="currentQuestion().audio_url" class="mb-8 p-6 bg-indigo-50 rounded-2xl flex items-center gap-4">
             <button (click)="playAudio(currentQuestion().audio_url)" class="w-12 h-12 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition-all">🔊</button>
             <span class="text-xs font-black text-indigo-400 uppercase tracking-widest leading-none">Listen to Audio</span>
          </div>

          <!-- Options -->
          <div class="grid grid-cols-1 gap-4 mb-20">
             <button *ngFor="let opt of currentQuestion().options" 
                     (click)="selectOption(opt)"
                     [disabled]="isChecking"
                     [ngClass]="getOptionClass(opt)"
                     class="w-full text-left p-6 rounded-2xl border-2 font-bold transition-all flex justify-between items-center group active:scale-[0.98]">
                <span>{{ opt }}</span>
                <span class="opacity-0 group-hover:opacity-100 text-xs uppercase tracking-widest font-black transition-opacity">Select</span>
             </button>
          </div>
        </div>

        <div *ngIf="questions.length === 0" class="flex-1 flex items-center justify-center flex-col gap-8 text-center animate-in fade-in zoom-in duration-500">
           <div class="w-20 h-20 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center text-4xl shadow-inner border border-slate-100 rotate-12 italic font-black">?</div>
           <div>
             <h3 class="text-2xl font-black text-slate-800 mb-2 uppercase italic tracking-tight">Intelligence Gap</h3>
             <p class="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">No data packets found for this specific level. Please contact the administrator to deploy content.</p>
           </div>
           <button routerLink="/dashboard" class="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition-all">Abort Mission</button>
        </div>
      </main>

      <!-- Footer Action -->
      <footer *ngIf="!showResult() && questions.length > 0" class="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center px-2">
         <div *ngIf="feedbackMessage" class="flex flex-col">
            <span class="text-xs font-black uppercase tracking-widest" [ngClass]="isCorrect ? 'text-emerald-500' : 'text-rose-500'">{{ isCorrect ? 'Amazing!' : 'Incorrect' }}</span>
            <p class="text-[13px] font-bold text-slate-600">{{ feedbackMessage }}</p>
         </div>
         <div *ngIf="!feedbackMessage"></div>
         
         <button (click)="checkOrNext()" 
                 [disabled]="!selectedOption() && !feedbackMessage"
                 class="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale">
            {{ feedbackMessage ? 'Continue' : 'Check Answer' }}
         </button>
      </footer>

      <!-- Result Screen -->
      <div *ngIf="showResult()" class="flex-1 flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-700">
         <div class="w-32 h-32 bg-indigo-600 text-white rounded-[40px] flex items-center justify-center text-6xl shadow-2xl mb-8 rotate-12">🏆</div>
         <h1 class="text-4xl font-black text-slate-800 mb-4 tracking-tight uppercase italic">Level Complete!</h1>
         <p class="text-slate-400 font-bold mb-12">You're making incredible progress!</p>

         <div class="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
            <div class="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
               <span class="text-2xl font-black text-indigo-600">+{{ earnedXP }}</span>
               <p class="text-[10px] font-black uppercase text-indigo-400 tracking-widest mt-1">Total XP Earned</p>
            </div>
            <div class="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
               <span class="text-2xl font-black text-emerald-600">100%</span>
               <p class="text-[10px] font-black uppercase text-emerald-400 tracking-widest mt-1">Accuracy</p>
            </div>
         </div>

         <button (click)="finishLesson()" class="w-full max-w-sm py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest">
            Continue to Path
         </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #fff; }
    .animate-in { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class LessonModuleComponent implements OnInit {
  questions: any[] = [];
  currentIndex = 0;
  progress = signal(0);
  hearts = signal(5);
  selectedOption = signal<string | null>(null);
  isChecking = false;
  isCorrect = false;
  feedbackMessage = '';
  showResult = signal(false);
  earnedXP = 0;

  levelId: number | null = null;
  levelSlug: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grammarService: GrammarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) this.hearts.set(user.hearts);

    this.route.params.subscribe(params => {
      this.levelSlug = params['level'];
      this.fetchLevelQuestions(this.levelSlug);
    });
  }

  fetchLevelQuestions(slug: string) {
    this.grammarService.getCategories().subscribe(cats => {
      // Robust recursive find helper
      const findDeep = (list: any[], targetSlug: string): any => {
        for (const item of list) {
          if (item.slug === targetSlug) return item;
          if (item.children) {
            const foundChild = findDeep(item.children, targetSlug);
            if (foundChild) return foundChild;
          }
        }
        return null;
      };

      const targetCat = findDeep(cats, slug);

      if (targetCat) {
        this.levelId = targetCat.id;
        this.grammarService.getQuestionsByCategory(targetCat.id).subscribe(qs => {
          this.questions = qs || [];
          this.updateProgress();
        });
      } else {
        console.error('Category not found for slug:', slug);
        this.questions = [];
      }
    });
  }

  currentQuestion() {
    return this.questions[this.currentIndex];
  }

  selectOption(opt: string) {
    if (this.isChecking) return;
    this.selectedOption.set(opt);
  }

  getOptionClass(opt: string) {
    if (this.feedbackMessage) {
       if (opt === this.currentQuestion().correct_answer) return 'bg-emerald-50 border-emerald-500 text-emerald-700';
       if (opt === this.selectedOption() && !this.isCorrect) return 'bg-rose-50 border-rose-500 text-rose-700';
    }
    return this.selectedOption() === opt 
      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-lg shadow-indigo-100' 
      : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200';
  }

  checkOrNext() {
    if (this.feedbackMessage) {
      this.nextQuestion();
    } else {
      this.checkAnswer();
    }
  }

  checkAnswer() {
    this.isChecking = true;
    const q = this.currentQuestion();
    this.isCorrect = this.selectedOption() === q.correct_answer;
    
    if (this.isCorrect) {
      this.feedbackMessage = 'Correct Answer!';
      this.earnedXP += 10;
    } else {
      this.feedbackMessage = q.explanation || `The correct answer was: ${q.correct_answer}`;
      this.hearts.update(h => Math.max(0, h - 1));
      if (this.hearts() === 0) {
        alert('Game Over! You ran out of hearts.');
        this.goBack();
      }
    }
  }

  nextQuestion() {
    this.isChecking = false;
    this.feedbackMessage = '';
    this.selectedOption.set(null);
    
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.updateProgress();
    } else {
      this.showResult.set(true);
      this.progress.set(100);
    }
  }

  updateProgress() {
    if (this.questions.length === 0) return;
    this.progress.set((this.currentIndex / this.questions.length) * 100);
  }

  playAudio(url: string) {
    const audio = new Audio(url);
    audio.play();
  }

  finishLesson() {
    if (!this.levelId) return;

    this.grammarService.saveScore({
      category_id: this.levelId,
      score: 100, // Fixed 100 for now, could be dynamic
      hearts: this.hearts(),
      xp: this.earnedXP
    }).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.router.navigate(['/dashboard']);
      },
      error: () => this.router.navigate(['/dashboard'])
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
