import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Yeni import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // <-- FormsModule'ı ekle
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  user = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.user).subscribe({
      next: () => {
        this.router.navigate(['/']); // Başarılı girişten sonra ana sayfaya yönlendir
      },
      error: (err) => {
        this.errorMessage = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
        console.error(err);
      }
    });
  }
}