import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuleService } from '../../../core/services/module.service';

@Component({
  selector: 'app-admin-modules',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-12 max-w-[1400px] mx-auto min-h-screen bg-slate-50 relative overflow-hidden">
      <header class="mb-14">
        <h1 class="text-4xl font-black text-slate-900 mb-2 uppercase italic tracking-tight underline decoration-primary/20 decoration-8 underline-offset-8">Module Management</h1>
        <p class="text-slate-500 font-bold text-[14px] uppercase tracking-widest italic opacity-50">Create and monitor linguistic training clusters.</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
        <!-- Module List -->
        <section class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div class="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
            <h3 class="text-xl font-bold text-slate-800">Available Modules</h3>
            <span class="text-xs font-semibold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{{ modules.length }} Total</span>
          </div>
          
          <div class="flex flex-col gap-3">
             <div *ngIf="modules.length === 0" class="py-16 text-center border-2 border-dashed border-slate-100 rounded-xl">
                <p class="text-sm text-slate-400">No modules found. Create one to get started.</p>
             </div>

             <div *ngFor="let m of modules" class="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 hover:border-primary/30 transition-colors group">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center font-bold text-sm border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors">
                      {{ m.name[0].toUpperCase() }}
                   </div>
                   <div class="flex flex-col">
                      <span class="text-sm font-semibold text-slate-700">{{ m.name }}</span>
                      <span class="text-[10px] text-slate-400">Added on {{ m.created_at | date:'mediumDate' }}</span>
                   </div>
                </div>
                <button (click)="onDelete(m.id)" class="text-[10px] font-bold text-rose-500 opacity-100 px-3 py-1 hover:bg-rose-50 rounded-md transition-all active:scale-95">Delete</button>
             </div>
          </div>
        </section>

        <!-- Normal Create Form -->
        <section>
           <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 class="text-lg font-bold text-slate-800 mb-2">Create New Module</h2>
              <p class="text-xs text-slate-500 mb-8 font-medium">Add a new learning category to the student dashboard.</p>

              <form [formGroup]="moduleForm" (ngSubmit)="onCreate()" class="flex flex-col gap-5">
                 <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold text-slate-600 ml-1">Module Name</label>
                    <input type="text" formControlName="name" placeholder="e.g. Advanced Vocabulary" 
                           class="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 placeholder:text-slate-300">
                    
                    <div *ngIf="errorMessage" class="text-[10px] font-bold text-rose-500 mt-1 ml-1">{{ errorMessage }}</div>
                    <div *ngIf="successMessage" class="text-[10px] font-bold text-emerald-500 mt-1 ml-1">{{ successMessage }}</div>
                 </div>

                 <button type="submit" [disabled]="moduleForm.invalid || isLoading" 
                         class="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isLoading ? 'Saving...' : 'Add Module' }}
                 </button>
              </form>
           </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #fff; min-height: 100vh; }
  `]
})
export class AdminModulesComponent implements OnInit {
  modules: any[] = [];
  moduleForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private moduleService: ModuleService, private cdr: ChangeDetectorRef) {
    this.moduleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    this.loadModules();
  }

  loadModules() {
    this.moduleService.getModules().subscribe({
      next: (data) => {
        this.modules = data;
        this.cdr.detectChanges();
      },
      error: () => this.errorMessage = 'Could not sync with regional assets.'
    });
  }

  onCreate() {
    if (this.moduleForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const moduleData = this.moduleForm.value;

    this.moduleService.createModule(moduleData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Module added successfully.';
        this.moduleForm.reset();
        this.loadModules();
        this.cdr.detectChanges();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Deployment aborted.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      this.moduleService.deleteModule(id).subscribe({
        next: () => {
          this.successMessage = 'Module removed successfully.';
          this.loadModules();
          this.cdr.detectChanges();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Deletion failed.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}
