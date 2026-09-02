import { Injectable, signal, computed } from '@angular/core';

export interface Breadcrumb {
  label: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  
  private readonly _title = signal<string>('');
  private readonly _breadcrumbs = signal<Breadcrumb[]>([]);

  readonly title = this._title.asReadonly();
  readonly breadcrumbs = this._breadcrumbs.asReadonly();
  
  readonly isVisible = computed(() => this.title() !== '' || this.breadcrumbs().length > 0);

  setTitle(title: string) {
    this._title.set(title);
  }

  setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this._breadcrumbs.set(breadcrumbs);
  }

  clear() {
    this._title.set('');
    this._breadcrumbs.set([]);
  }
}
