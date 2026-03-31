import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-quiz-system',
  standalone: true,
  template: `
    <div class="max-w-[800px] mx-auto py-8 animate-fade-in">
      <div class="card p-12">
        <header class="flex justify-between items-center mb-8">
           <h2 class="text-2xl font-extrabold text-slate-800">Daily Grammar Sprint</h2>
           <div class="bg-red-50 text-red-500 px-4 py-2 rounded-full font-bold text-sm tracking-wide">⏱️ 04:45</div>
        </header>
        
        <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-10">
           <div class="h-full bg-amber-400 rounded-full transition-all duration-300" [style.width.%]="(currentQuestion() / totalQuestions) * 100"></div>
        </div>

        @if (!quizFinished()) {
           <div class="flex flex-col">
              <span class="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Question {{ currentQuestion() }} of {{ totalQuestions }}</span>
              <h3 class="text-2xl font-bold text-slate-800 mb-10 leading-relaxed">{{ questions[currentQuestion()-1].text }}</h3>
              
              <div class="flex flex-col gap-4 mb-12">
                 @for (option of questions[currentQuestion()-1].options; track option; let i = $index) {
                   <div 
                     class="p-5 px-8 border-2 rounded-md font-semibold text-slate-600 cursor-pointer transition-all hover:bg-slate-50 border-slate-100"
                     [class.border-amber-400]="selectedOption() === i"
                     [class.bg-amber-50]="selectedOption() === i"
                     [class.text-amber-900]="selectedOption() === i"
                     (click)="selectedOption.set(i)">
                     {{ option }}
                   </div>
                 }
              </div>

              <div class="flex justify-between items-center">
                 <button class="px-8 py-3 bg-slate-100 text-slate-500 rounded-md font-bold text-sm hover:bg-slate-200 transition-colors">Report Issue</button>
                 <button 
                   class="btn-primary min-w-[200px]" 
                   [disabled]="selectedOption() === null"
                   (click)="nextQuestion()">
                   {{ currentQuestion() === totalQuestions ? 'Finish Quiz' : 'Next Question' }}
                 </button>
              </div>
           </div>
        }

        @if (quizFinished()) {
           <div class="text-center py-10">
              <h1 class="text-4xl font-extrabold mb-4">Quiz Finished!</h1>
              <p class="text-slate-500">Redirecting to dashboard...</p>
           </div>
        }
      </div>
    </div>
  `
})
export class QuizSystemComponent {
  currentQuestion = signal(1);
  totalQuestions = 5;
  selectedOption = signal<number | null>(null);
  quizFinished = signal(false);

  questions = [
    { text: 'Which of these is a correct reflexive pronoun?', options: ['Myself', 'Me', 'Mine', 'I'] },
    { text: 'Choose the correct preposition: He is interested ___ music.', options: ['On', 'At', 'In', 'For'] },
    { text: 'Identify the conjunction: I like tea, but I hate coffee.', options: ['Like', 'But', 'Hate', 'Tea'] },
    { text: 'Which sentence is in active voice?', options: ['The cake was eaten by him.', 'He ate the cake.', 'The cake is being eaten.', 'The cake has been eaten.'] },
    { text: 'Pick the correct comparative form: This book is ___ than that one.', options: ['Gooder', 'Best', 'Better', 'More good'] }
  ];

  nextQuestion() {
    if (this.currentQuestion() < this.totalQuestions) {
      this.currentQuestion.set(this.currentQuestion() + 1);
      this.selectedOption.set(null);
    } else {
      this.quizFinished.set(true);
      window.location.href = '/dashboard';
    }
  }
}
