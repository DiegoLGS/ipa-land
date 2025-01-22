import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'         
    },    
    {
      path: 'home',
      loadComponent: () =>
        import('./components/home/home.component').then(
          (m) => m.HomeComponent
        ),
        data: { animation: 'home' },
    },
    {
      path: 'menu',
      loadComponent: () =>
        import('./components/menu/menu.component').then(
          (m) => m.MenuComponent
        ),
        data: { animation: 'menu' },
    },
    {
      path: 'local',
      loadComponent: () =>
        import('./components/local/local.component').then(
          (m) => m.LocalComponent
        ),
        data: { animation: 'local' },
    },
    {
      path: 'login',
      loadComponent: () =>
        import('./components/login/login.component').then(
          (m) => m.LoginComponent
        ),
        data: { animation: 'login' },
    },
    {
      path: '**',
      loadComponent: () =>
        import('./components/page-not-found/page-not-found.component').then(
          (m) => m.PageNotFoundComponent
        ),
      data: { animation: 'page-not-found' },
    },
];
