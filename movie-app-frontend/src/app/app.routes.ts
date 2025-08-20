import { Routes } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';
import { MovieDetail } from './components/movie-detail/movie-detail';
import { PersonDetail } from './components/person-detail/person-detail'; // <-- Yeni import
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies';
import { Login } from './components/login/login'; // <-- Yeni import
import { Register } from './components/register/register'; 


export const routes: Routes = [
    {path: '', component: MovieList},
    {path:'movie/:id', component: MovieDetail}, // <-- Düzeltilmiş rota
    {path:'person/:id', component:PersonDetail},
    { path: 'favorites', component: FavoriteMoviesComponent }, // <-- Yeni rota
      { path: 'login', component: Login }, // <-- Yeni rota
    { path: 'register', component: Register } // <-- Yeni rota

];
