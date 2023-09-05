import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  users: any[] = [
    { email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
    { email: 'client@gmail.com', password: 'client123', role: 'client' }
  ];

  constructor(private router: Router, private appComponent: AppComponent) {}

  submitForm() {
    const matchedUser = this.users.find(user => user.email === this.username && user.password === this.password);

    if (matchedUser) {
      console.log('Giriş Başarılı');
      // Kullanıcının rolünü localStorage'a kaydet
      localStorage.setItem('userRole', matchedUser.role);
      // Giriş başarılıysa /home sayfasına yönlendir
      this.router.navigate(['/home']);

      // Çağrı, setShowSideMenu fonksiyonunu AppComponent örneklemi üzerinden gerçekleştirilir
      this.appComponent.setShowSideMenu(true);
    } else {
      console.log('Giriş Başarısız');
    }
  }
}
