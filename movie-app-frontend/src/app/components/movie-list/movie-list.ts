import { CommonModule } from '@angular/common';
import { MovieApi } from './../../services/movie-api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common'; // <-- Bu satırı ekleyin
import { ScrollingModule } from '@angular/cdk/scrolling'; // Bu modülü import edin
import { Subject ,fromEvent} from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service'; // <-- AuthService'i içe aktar



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


  constructor(private movieApi: MovieApi,private authService: AuthService // <-- AuthService'i enjekte et

  ){}

   ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.getFavoriteMovies();
      } else {
        this.favoriteMovieIds = []; // Çıkış yapıldığında favorileri temizle
      }
    });
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
    // Sadece kullanıcı kimlik doğrulaması yapmışsa abone ol
    if (this.authService.isLoggedIn()) {
      this.movieApi.getFavoriteMovieIds().subscribe(
        (ids: number[]) => {
          this.favoriteMovieIds = ids;
        },
        (error: any) => {
          console.error('Favoriler yüklenemedi', error);
          this.favoriteMovieIds = [];
        }
      );
    } else {
      // Giriş yapılmadıysa listeyi boşalt
      this.favoriteMovieIds = [];
    }
  }


  isFavorite(movieId: number): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

  toggleFavorite(movieId: number): void {
    if (!this.authService.isLoggedIn()) {
      // Kullanıcıya bir mesaj gösterebilirsiniz
      alert('Favorilere eklemek için lütfen giriş yapın.');
      return;
    }

    if (this.isFavorite(movieId)) {
      this.movieApi.removeFavorite(movieId).subscribe(() => {
        this.getFavoriteMovies();
      });
    } else {
      this.movieApi.addFavorite(movieId).subscribe(() => {
        this.getFavoriteMovies();
      });
    }
  }
  
  
}
