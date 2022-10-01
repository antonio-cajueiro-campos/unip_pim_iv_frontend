import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/guards/auth.guard';
import { LoginGuard } from './services/guards/login.guard';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
