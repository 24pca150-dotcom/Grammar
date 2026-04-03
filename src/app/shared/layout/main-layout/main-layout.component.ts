import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="flex min-h-screen bg-white">
      <app-sidebar></app-sidebar>
      
      <div class="flex-1 ml-0 lg:ml-[240px] flex flex-col min-h-screen">
        <!-- Dashboard Top Header (Integrated) -->
        <main class="flex-1 p-6 lg:p-10 bg-white min-h-screen overflow-x-hidden">
          <router-outlet></router-outlet>
        </main>

        <footer class="p-8 border-t border-slate-50 flex flex-wrap justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-300">
           <span>Grammar Web App</span>
           <div class="flex gap-8">
              <a class="hover:text-slate-500 cursor-pointer transition-colors">Privacy Policy</a>
              <a class="hover:text-slate-500 cursor-pointer transition-colors">Terms of Service</a>
              <a class="hover:text-slate-500 cursor-pointer transition-colors">Curriculum</a>
              <a class="hover:text-slate-500 cursor-pointer transition-colors">For Educators</a>
           </div>
           <span>© 2024 The Fluid Scholar. Mastery through flow.</span>
        </footer>
      </div>
    </div>
  `
})
export class MainLayoutComponent {}
