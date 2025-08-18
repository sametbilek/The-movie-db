import { CommonModule } from '@angular/common';
import { MovieApi } from './../../services/movie-api';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {

  movies: any[] = [];

  constructor(private movieApi: MovieApi){}

   ngOnInit(): void {
    this.movieApi.getPopularMovies().subscribe(response => {
      this.movies = response.results;
    });
  }

}
