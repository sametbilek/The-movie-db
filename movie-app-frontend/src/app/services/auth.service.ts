import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  login(user: any): Observable<any> {
  return this.http.post(`${this.API_URL}/login`, user).pipe(
    tap((response: any) => {
      console.log('Gelen yanıt:', response);
      if (response && response.jwt) { // <-- Jwt alanı var mı kontrol et
        localStorage.setItem('jwtToken', response.jwt);
        localStorage.setItem('username', response.username);
        this.isLoggedInSubject.next(true);
      } else {
          // Yanıt doğru formatta değilse hata mesajı gösterilebilir
          console.error('Login yanıtı beklenen formatta değil.');
      }
    })
  );
}
  
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false); // Giriş durumunu güncelle
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
}