import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {PopUserComponent} from '../../pop-user/pop-user.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  isActive = false;
  showMenu = '';
  pushRightClass = 'push-right';

  @ViewChild(PopUserComponent) child: PopUserComponent;
  node_number;
  email;

  constructor(private translate: TranslateService, public router: Router) {
    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.node_number = localStorage.getItem('node_number');
    this.email = localStorage.getItem('email');
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

  onLoggedout() {
    localStorage.removeItem('token');
    localStorage.removeItem('node_number');
    localStorage.removeItem('email');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedin');
  }

  open() {
    this.child.open(this.child.content, this.node_number, this.email);
  }

}
