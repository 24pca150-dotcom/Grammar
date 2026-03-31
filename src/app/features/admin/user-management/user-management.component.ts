import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-12 max-w-[1400px] mx-auto min-h-screen bg-white shadow-xl shadow-slate-200/50 relative overflow-hidden border-x border-slate-100">
      
      <!-- Top Actions -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 class="text-4xl font-black text-slate-900 mb-2 uppercase italic tracking-tight underline decoration-primary/20 decoration-8 underline-offset-8">Scholar Directory</h1>
          <p class="text-slate-500 font-bold text-[14px] uppercase tracking-widest italic opacity-50">Managing permissions and activity across clusters.</p>
        </div>
        <div class="flex items-center gap-4 group">
           <div class="relative">
              <input type="text" placeholder="Filter scholarship body..." class="pl-12 pr-6 py-4 bg-slate-50 border border-slate-100/50 rounded-2xl text-[12px] font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-300 italic uppercase w-[320px]">
              <span class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
           </div>
           <button class="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center transition-all hover:scale-105 shadow-xl shadow-indigo-500/20">+</button>
        </div>
      </header>

      <!-- Full Table -->
      <section class="mb-14 overflow-hidden rounded-[42px] border border-slate-100 shadow-sm">
         <div class="overflow-x-auto">
            <table class="w-full">
               <thead class="bg-slate-50/50 border-b border-slate-50">
                  <tr>
                     <th class="text-left px-12 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] italic">Full Scholar Profile</th>
                     <th class="text-left px-4 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] italic">System Status</th>
                     <th class="text-left px-4 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] italic">Educational Level</th>
                     <th class="text-left px-4 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] italic">Active Module</th>
                     <th class="text-center px-12 py-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] italic">Actions</th>
                  </tr>
               </thead>
               <tbody class="divide-y divide-slate-50/50">
                  <tr *ngFor="let user of users" class="group hover:bg-slate-50/20 transition-all">
                     <td class="px-12 py-10">
                        <div class="flex items-center gap-8">
                           <div class="w-16 h-16 rounded-3xl flex items-center justify-center font-bold text-lg shadow-sm border border-indigo-100/30 overflow-hidden bg-white group-hover:scale-105 transition-transform">
                              <img [src]="'https://api.dicebear.com/7.x/initials/svg?seed=' + user.name" alt="Avatar">
                           </div>
                           <div class="flex flex-col">
                              <span class="text-[16px] font-black text-slate-900 leading-tight uppercase italic group-hover:text-primary transition-colors">{{ user.name }}</span>
                              <span class="text-[11px] font-bold text-slate-400 lowercase italic opacity-60">{{ user.email }}</span>
                           </div>
                        </div>
                     </td>
                     <td class="px-4 py-10">
                        <span class="px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border"
                              [ngClass]="user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/5' : 'bg-slate-100 text-slate-500 border-slate-200'">
                           {{ user.status }}
                        </span>
                     </td>
                     <td class="px-4 py-10">
                        <div class="flex flex-col gap-3 w-[180px]">
                           <div class="flex justify-between items-center">
                              <span class="text-[11px] font-black text-slate-900 uppercase italic">Level {{ user.level }}</span>
                              <span class="text-[9px] font-bold text-primary italic uppercase">{{ (user.level / 30 * 100).toFixed(0) }}%</span>
                           </div>
                           <div class="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50 p-0.5">
                              <div class="h-full bg-primary rounded-full transition-all duration-1000 shadow-sm shadow-indigo-500/20" [style.width.%]="(user.level / 30) * 100"></div>
                           </div>
                        </div>
                     </td>
                     <td class="px-4 py-10">
                        <span class="text-[13px] font-bold text-slate-600 italic uppercase italic opacity-80">{{ user.current_module }}</span>
                     </td>
                     <td class="px-12 py-10 text-center">
                        <div class="flex items-center justify-center gap-3">
                           <button class="w-10 h-10 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-primary transition-all flex items-center justify-center border border-transparent hover:border-indigo-100">✏️</button>
                           <button class="w-10 h-10 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center border border-transparent hover:border-rose-100">🗑️</button>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         
         <div class="flex justify-between items-center p-12 bg-slate-50/30 border-t border-slate-50">
            <div class="flex items-center gap-4">
               <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Page 1 of 42</span>
            </div>
            <div class="flex gap-3">
               <button class="px-6 py-3 rounded-2xl hover:bg-white bg-slate-100/50 border border-slate-100 transition-all font-black text-[10px] uppercase tracking-[0.2em] italic text-slate-400">Previous Cluster</button>
               <button class="px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all font-black text-[10px] uppercase tracking-[0.2em] italic text-slate-900 shadow-sm">Next Cluster</button>
            </div>
         </div>
      </section>
      
    </div>
  `,
  styles: [`
    :host { display: block; overflow-x: hidden; }
  `]
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:8000/api/admin/users').subscribe(res => {
      this.users = res.data;
    });
  }
}
