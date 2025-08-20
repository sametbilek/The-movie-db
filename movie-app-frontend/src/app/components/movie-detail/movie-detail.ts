import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieApi } from '../../services/movie-api';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail implements OnInit {
  movie: any;

  cast: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieApi: MovieApi
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieApi.getMovieDetails(+id).subscribe(response => {
        this.movie = response;

      this.movieApi.getMovieCast(+id).subscribe(response => {
        this.cast = response.cast;
            });

        console.log("Response : " ,this.movie);
      });
    }
  }

}
