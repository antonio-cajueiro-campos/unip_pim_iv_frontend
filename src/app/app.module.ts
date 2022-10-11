import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpInterceptorProvider } from './services/http-interceptor.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderScreenComponent } from './components/loader-screen/loader-screen.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ServicesComponent } from './pages/services/services.component';
import { ChatFuncionarioComponent } from './pages/chat-funcionario/chat-funcionario.component';
import { RegisterComponent } from './pages/register/register.component';
import { PriceSelectorComponent } from './components/price-selector/price-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    ServicesComponent,
    ProfileComponent,
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    LoaderScreenComponent,
    PaymentComponent,
    LoaderComponent,
    ChatFuncionarioComponent,
    PriceSelectorComponent
  ],
  imports: [
    IonicModule.forRoot(),
    SweetAlert2Module.forRoot(),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    HttpInterceptorProvider,
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
