import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 p-8">
      <div class="w-full max-w-[500px] bg-white p-12 rounded-[30px] shadow-2xl shadow-black/5 animate-fade-in border-none">
        <div class="text-center mb-10">
          <div class="w-12 h-12 bg-primary text-white rounded-[14px] flex items-center justify-center text-[1.75rem] font-extrabold mx-auto mb-6 shadow-lg shadow-indigo-500/20">G</div>
          <h2 class="text-[1.75rem] font-extrabold mb-2 text-slate-800 tracking-tight">Create Account</h2>
          <p class="text-slate-500 text-[0.95rem]">Join us and start your AI-powered English journey today.</p>
        </div>
        
        <form class="flex flex-col gap-5" (submit)="onRegister()">
          <div class="flex flex-col gap-2">
            <label class="text-[0.9rem] font-semibold text-slate-600">Full Name</label>
            <input type="text" name="name" [(ngModel)]="name" placeholder="John Doe" class="auth-input">
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-[0.9rem] font-semibold text-slate-600">Email Address</label>
            <input type="email" name="email" [(ngModel)]="email" placeholder="john@example.com" class="auth-input">
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-[0.9rem] font-semibold text-slate-600">Password</label>
            <input type="password" name="password" [(ngModel)]="password" placeholder="Min 8 characters" class="auth-input">
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-[0.9rem] font-semibold text-slate-600">Confirm Password</label>
            <input type="password" name="password_confirmation" [(ngModel)]="password_confirmation" placeholder="Confirm Password" class="auth-input">
          </div>

          <div *ngIf="errorMessage" class="p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-xs font-bold text-center">
            {{errorMessage}}
          </div>
          
          <button type="submit" class="btn-primary w-full mt-4">Create Account</button>
        </form>
        
        <p class="text-center mt-8 text-slate-500 text-[0.95rem]">
          Already have an account? <a routerLink="/login" class="text-indigo-600 font-bold hover:underline">Log in</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-input {
      @apply p-3.5 rounded-md border border-slate-200 text-base transition-all focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10;
    }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  password_confirmation = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.errorMessage = '';
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please check your details.';
      }
    });
  }
}
