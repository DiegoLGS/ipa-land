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
    },
    {
      path: 'menu',
      loadComponent: () =>
        import('./components/menu/menu.component').then(
          (m) => m.MenuComponent
        ),
    },
    {
      path: 'local',
      loadComponent: () =>
        import('./components/local/local.component').then(
          (m) => m.LocalComponent
        ),
    },
];
