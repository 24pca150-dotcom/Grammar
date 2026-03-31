import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-soft-gradient p-8 overflow-hidden">
      <div #loginCard class="w-full max-w-[460px] bg-white p-12 rounded-xl shadow-2xl border border-slate-100 opacity-0 translate-y-[20px]">
        <div #headerSection class="text-center mb-10 opacity-0">
          <div class="w-11 h-11 bg-primary text-white rounded-md flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-indigo-500/20 shadow-lg font-sans">G</div>
          <h2 class="text-3xl font-bold mb-2 text-slate-900 tracking-tight font-black uppercase italic">Professional Access</h2>
          <p class="text-slate-500 text-[0.95rem] font-medium leading-relaxed italic">Enter your credentials to access the laboratory.</p>
        </div>
        
        <form class="flex flex-col gap-6" (submit)="onLogin()">
          <div #emailField class="flex flex-col gap-2 opacity-0 translate-x-[-10px]">
             <div class="flex justify-between items-center">
                <label class="text-[0.9rem] font-black text-slate-600 uppercase tracking-widest text-[9px] italic">Email Address</label>
             </div>
            <input type="email" name="email" [(ngModel)]="email" placeholder="scholar@grammarhub.ai" class="auth-input font-bold text-slate-900">
          </div>
          
          <div #passField class="flex flex-col gap-2 opacity-0 translate-x-[-10px]">
            <div class="flex justify-between items-center">
              <label class="text-[0.9rem] font-black text-slate-600 uppercase tracking-widest text-[9px] italic">Password</label>
            </div>
            <input type="password" name="password" [(ngModel)]="password" placeholder="••••••••" class="auth-input font-bold text-slate-900">
          </div>

          <div *ngIf="errorMessage" class="p-4 bg-rose-50 border border-rose-100 rounded-lg">
             <p class="text-[10px] font-bold text-rose-600 uppercase tracking-widest text-center">{{errorMessage}}</p>
          </div>
          
          <button type="submit" #submitBtn class="btn-primary w-full mt-4 opacity-0 scale-95 uppercase tracking-widest text-[11px] font-black py-4 shadow-xl shadow-indigo-500/10">
            Sign In to Dashboard
          </button>
        </form>
        
        <p class="text-center mt-10 text-slate-500 text-[0.9rem] font-bold italic">
          New here? <a routerLink="/register" class="text-primary font-black hover:underline">Create Account</a>
        </p>

        <div class="mt-8 pt-8 border-t border-slate-50 opacity-40 hover:opacity-100 transition-opacity">
           <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center mb-2">Demo Access</p>
           <div class="flex flex-col items-center gap-1 text-[9px] font-bold text-slate-500">
              <span>Admin: admin@grammarhub.com / admin123</span>
              <span>Student: student@example.com / password</span>
           </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-input {
      @apply p-4 rounded-xl border border-slate-100 bg-slate-50 text-sm transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white;
    }
  `]
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginCard') loginCard!: ElementRef;
  @ViewChild('headerSection') headerSection!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('passField') passField!: ElementRef;
  @ViewChild('submitBtn') submitBtn!: ElementRef;

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  onLogin() {
    this.errorMessage = '';
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to(this.loginCard.nativeElement, { opacity: 1, y: 0, duration: 1.2 })
      .to(this.headerSection.nativeElement, { opacity: 1, duration: 0.8 }, '-=0.6')
      .to([this.emailField.nativeElement, this.passField.nativeElement], { 
        opacity: 1, 
        x: 0, 
        stagger: 0.15, 
        duration: 0.8 
      }, '-=0.4')
      .to(this.submitBtn.nativeElement, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.2');
  }
}
