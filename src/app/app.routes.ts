import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'native-quill',
    loadComponent: () => import('./quills-playground/quills-playground.component').then(m => m.QuillsPlaygroundComponent)
  },
  {
    path: 'ngx-quill',
    loadComponent: () => import('./ngx-quill-playground/ngx-quill-playground.component').then(m => m.NgxQuillPlaygroundComponent)
  },
  {
    path: 'design-tokens',
    loadComponent: () => import('./token-playground/token-playground.component').then(m => m.TokenPlaygroundComponent)
  }
];
