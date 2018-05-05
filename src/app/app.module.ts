import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuardService as AuthGuard} from './shared';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtModule} from '@auth0/angular-jwt';
import {ClipboardModule} from 'ngx-clipboard';

import {UtilService} from './interface/util.service'; // 2
import {AuthService} from './interface/auth.service'; // 3
import {RequestInterceptor} from './interface/request-interceptor.service';
import {KeyService} from './interface/key.service';
import {TxService} from './interface/tx.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {BlockService} from './interface/block.service';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  // for development
  // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000', 'simchain.kr:3000'],
        blacklistedRoutes: ['localhost:3000/auth/', 'simchain.kr:3000/auth']
      }
    }),
    NgxDatatableModule,
    ClipboardModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    AuthGuard, UtilService, AuthService, JwtHelperService,
    KeyService, TxService, BlockService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
