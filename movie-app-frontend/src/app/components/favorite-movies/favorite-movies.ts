import { Component, OnInit } from '@angular/core';
import { MovieApi } from '../../services/movie-api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorite-movies.html',
  styleUrls: ['../movie-list/movie-list.css', './favorite-movies.css']
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = [];
  loading: boolean = true;

  constructor(private movieApi: MovieApi) { }

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

  loadFavoriteMovies(): void {
    this.loading = true;
    this.movieApi.getFavoriteMovieIds().subscribe(ids => {
      const movieDetailsObservables = ids.map(id => this.movieApi.getMovieDetails(id));

      if (movieDetailsObservables.length > 0) {
        // Birden fazla isteği aynı anda yapmak için forkJoin kullanın
        // forkJoin: RxJS'den gelir, import etmelisiniz.
        // import { forkJoin } from 'rxjs';
        forkJoin(movieDetailsObservables).subscribe(movies => {
          this.favoriteMovies = movies;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }
}