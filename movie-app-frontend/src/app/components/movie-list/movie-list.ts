import { CommonModule } from '@angular/common';
import { MovieApi } from './../../services/movie-api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common'; // <-- Bu satırı ekleyin
import { ScrollingModule } from '@angular/cdk/scrolling'; // Bu modülü import edin
import { Subject ,fromEvent} from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule,RouterModule,ScrollingModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieList implements OnInit,OnDestroy {

  movies: any[] = [];
  favoriteMovieIds: number[] = []; // <-- Yeni değişken


  currentPage: number = 1;

  loading: boolean = false ;

  hasMorePages: boolean = true;

  private unsubscribe$ = new Subject<void>();


  constructor(private movieApi: MovieApi,
  ){}

   ngOnInit(): void {
    this.getFavoriteMovies();

    this.loadMovies();
    this.setupInfiniteScroll();
  }
   ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadMovies(): void {
    if (this.loading || !this.hasMorePages) return;
    
    this.loading = true;
    this.movieApi.getPopularMovies(this.currentPage).subscribe((response: any) => {
      this.movies = [...this.movies, ...response.results];
      this.currentPage++;
      this.loading = false;
      
      if (this.currentPage > response.total_pages) {
        this.hasMorePages = false;
      }
    });
  }
setupInfiniteScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(
        debounceTime(200),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const bodyHeight = document.body.offsetHeight;
        
        if (bodyHeight - scrollPosition < 500) {
          this.loadMovies();
        }
      });
  }
   getFavoriteMovies(): void {
    this.movieApi.getFavoriteMovieIds().subscribe(ids => {
      this.favoriteMovieIds = ids;
    });
  }

  isFavorite(movieId: number): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

  toggleFavorite(movieId: number): void {
    if (this.isFavorite(movieId)) {
      this.movieApi.removeFavorite(movieId).subscribe(() => {
        this.getFavoriteMovies(); // Listeyi yeniden çek
      });
    } else {
      this.movieApi.addFavorite(movieId).subscribe(() => {
        this.getFavoriteMovies(); // Listeyi yeniden çek
      });
    }
  }
  
  
}
