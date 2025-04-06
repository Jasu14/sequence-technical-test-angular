import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
    // { path: 'home', component: HomeComponent, data: { title: 'HOME' } },
    { path: 'songs', component: ListComponent, data: { title: 'SONGS' } },
    { path: 'artists', component: ListComponent, data: { title: 'ARTISTS' } },
    { path: 'companies', component: ListComponent, data: { title: 'COMPANIES' } },
    { path: '**', redirectTo: 'home' }
];
