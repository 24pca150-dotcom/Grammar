import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-2xl mx-auto py-12 px-6">
      <header class="text-center mb-16 animate-fade-in">
        <div class="w-16 h-16 bg-amber-100 text-amber-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-amber-500/10 rotate-3">🏆</div>
        <h1 class="text-3xl font-black text-slate-800 tracking-tight uppercase italic mb-1">Global Scholars</h1>
        <p class="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">The Elite 1%</p>
      </header>

      <div class="flex flex-col gap-3">
        @for (item of users; track item.id) {
          <div [ngClass]="isMe(item) ? 'bg-indigo-600 text-white ring-4 ring-indigo-50 shadow-2xl' : 'bg-white text-slate-900 border border-slate-100 shadow-sm'"
               class="flex items-center gap-4 p-5 rounded-3xl transition-all hover:scale-[1.02] cursor-default group animate-in slide-in-from-bottom-[20px] duration-500"
               [style.animation-delay]="($index * 100) + 'ms'">
            
            <!-- Rank Badge -->
            <div class="w-10 h-10 flex items-center justify-center font-black text-sm rounded-xl"
                 [ngClass]="getRankClass($index, item)">
              {{ $index + 1 }}
            </div>

            <!-- Avatar -->
            <img [src]="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + item.name" 
                 class="w-12 h-12 rounded-xl bg-slate-50 border-2 border-white/20 shadow-sm">

            <!-- Name / Title -->
            <div class="flex-1 truncate">
              <h3 class="font-black text-[15px] uppercase tracking-tight">{{ item.name }}</h3>
              <span class="text-[9px] font-black uppercase tracking-widest opacity-40">{{ getTitle($index) }}</span>
            </div>

            <!-- XP Stats -->
            <div class="text-right flex flex-col items-end">
              <span class="text-sm font-black tracking-tighter" [ngClass]="isMe(item) ? 'text-white' : 'text-indigo-600'">{{ (item.total_xp || 0) | number }}</span>
              <span class="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">Points</span>
            </div>
          </div>
        }
      </div>

      <!-- If user is not in top 10 -->
      <div *ngIf="!currentUserInTop10" class="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 border-dashed text-center">
         <p class="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Learn more to climb the ranks!</p>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .gold { @apply bg-amber-400 text-white shadow-lg shadow-amber-200; }
    .silver { @apply bg-slate-300 text-white shadow-lg shadow-slate-100; }
    .bronze { @apply bg-orange-400 text-white shadow-lg shadow-orange-100; }
    .others { @apply bg-slate-50 text-slate-400; }
    .me-rank { @apply bg-white text-indigo-600; }
  `]
})
export class LeaderboardComponent implements OnInit {
  users: any[] = [];
  currentUser: any;
  currentUserInTop10 = false;
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.fetchLeaderboard();
  }

  fetchLeaderboard() {
    const token = localStorage.getItem('auth_token');
    this.http.get<any[]>(`${this.apiUrl}/leaderboard`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => {
      this.users = data;
      if (this.currentUser) {
         this.currentUserInTop10 = !!this.users.find(u => u.id === this.currentUser.id);
      }
    });
  }

  isMe(item: any) {
    return this.currentUser && item.id === this.currentUser.id;
  }

  getRankClass(index: number, item: any) {
    if (this.isMe(item)) return 'me-rank';
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return 'others';
  }

  getTitle(index: number) {
    if (index === 0) return 'The Legend';
    if (index === 1) return 'Master Craftsman';
    if (index === 2) return 'Royal Scholar';
    if (index < 5) return 'Elite Pro';
    return 'Rising Star';
  }
}
