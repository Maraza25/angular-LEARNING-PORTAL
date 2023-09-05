import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isCollapsed: boolean = false;
  showSideMenu: boolean = true;



  handleButtonClick() {
    console.log('Button clicked!');

    localStorage.removeItem('userRole');
    this.setShowSideMenu(false);
    this.router.navigate(['/login']);


  }

  constructor(private router: Router) {}

  ngOnInit() {
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
      // Kullanıcı rolü yoksa login sayfasına yönlendir
      this.router.navigate(['/login']);
      this.setShowSideMenu(false);
    } else {
      this.setShowSideMenu(true);

      // Eğer kullanıcı rolü varsa ve login sayfasına gitmeye çalışıyorsa home sayfasına yönlendir
      this.router.events.subscribe((event) => {

        if (event instanceof NavigationEnd) {
          if (event.url.includes('/login') && userRole) {
            this.router.navigate(['/home']);
          } else {
            this.setShowSideMenu(!event.url.includes('/login'));
          }
        }
      });

      // Kullanıcı rolü varsa home sayfasına yönlendir
    }
  }

  setShowSideMenu(value: boolean) {
    this.showSideMenu = value;
  }
}
