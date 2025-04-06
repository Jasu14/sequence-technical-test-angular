import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'HOME' } },
    { 
        path: 'songs',
        children: [
            { path: ':id', component: DetailsComponent, data: { title: 'SONG_DETAILS' } },
            { path: '', component: ListComponent, data: { title: 'SONGS' } }
        ]
    },
    { 
        path: 'artists',
        children: [
            { path: ':id', component: DetailsComponent, data: { title: 'ARTIST_DETAILS' } },
            { path: '', component: ListComponent, data: { title: 'ARTISTS' } }
        ]
    },
    { 
        path: 'companies',
        children: [
            { path: ':id', component: DetailsComponent, data: { title: 'COMPANY_DETAILS' } },
            { path: '', component: ListComponent, data: { title: 'COMPANIES' } }
        ]
    },
    { path: '**', redirectTo: 'home' }
];
