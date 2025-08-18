import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApi {
  private readonly API_URL = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient){}

  getPopularMovies():Observable<any> {
    return this.http.get(`${this.API_URL}/popular`);
  }

  getMovieDetails(id:number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`)
  }
  
}
