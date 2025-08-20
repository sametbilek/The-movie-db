import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApi {
  private readonly API_URL = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient){}

 getPopularMovies(page: number): Observable<any> {
  return this.http.get(`${this.API_URL}/popular?page=${page}`);
}

  getMovieDetails(id:number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`)
  }
  getMovieCast(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/cast`);
}
getPersonDetails(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/person/${id}`);
}
// services/movie-api.service.ts
// ...
addFavorite(movieId: number): Observable<any> {
  return this.http.post(`${this.API_URL}/favorite/add?movieId=${movieId}`, {});
}

removeFavorite(movieId: number): Observable<any> {
  return this.http.delete(`${this.API_URL}/favorite/remove?movieId=${movieId}`);
}

isFavorite(movieId: number): Observable<boolean> {
  return this.http.get<boolean>(`${this.API_URL}/favorite/${movieId}`);
}

getFavoriteMovieIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.API_URL}/favorite/ids`);
}
  
}
