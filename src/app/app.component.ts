import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthService,
  ) {
    router.events.subscribe((event: RouterEvent) => { //1
      this.refreshToken(event);
    });
  }

    ngOnInit() {
    }

  private refreshToken(event: RouterEvent): void {
    if (event instanceof NavigationStart && this.authService.isLoggedIn()) {
      this.authService.refresh().catch(response => null);
    }
  }

}
