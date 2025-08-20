import { Component, OnInit } from '@angular/core';
import { MovieApi } from '../../services/movie-api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorite-movies.html',
  styleUrls: ['../movie-list/movie-list.css', './favorite-movies.css'] // <-- Bu satırı kontrol edin
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = [];
  favoriteMovieIds: number[] = [];
  loading: boolean = true;

  constructor(
    private movieApi: MovieApi,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.loadFavoriteMovies();
    } else {
      this.loading = false;
      this.favoriteMovies = [];
    }
  }

  loadFavoriteMovies(): void {
    this.loading = true;
    this.movieApi.getFavoriteMovieIds().subscribe(ids => {
      this.favoriteMovieIds = ids;
      const movieDetailsObservables = ids.map(id => this.movieApi.getMovieDetails(id));
      
      if (movieDetailsObservables.length > 0) {
        forkJoin(movieDetailsObservables).subscribe(movies => {
          this.favoriteMovies = movies;
          this.loading = false;
        });
      } else {
        this.favoriteMovies = [];
        this.loading = false;
      }
    });
  }

  isFavorite(movieId: number): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

  toggleFavorite(movieId: number): void {
    if (!this.authService.isLoggedIn()) {
      alert('Favorilere eklemek için lütfen giriş yapın.');
      return;
    }

    if (this.isFavorite(movieId)) {
      this.movieApi.removeFavorite(movieId).subscribe(() => {
        // Favorilerden çıkarıldıktan sonra listeyi yeniden yükle
        this.loadFavoriteMovies();
      });
    } else {
      this.movieApi.addFavorite(movieId).subscribe(() => {
        // Favorilere eklendi, listeyi yeniden yüklemeye gerek yok,
        // çünkü zaten favori filmler sayfasındayız.
        // İstersen burada listeyi yeniden yükleyebilirsin.
      });
    }
  }
}