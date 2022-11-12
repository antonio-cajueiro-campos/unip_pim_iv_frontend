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
import { ServicesComponent } from './pages/services/services.component';
import { ChatFuncionarioComponent } from './pages/chat-funcionario/chat-funcionario.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { CompleteRegistrationComponent } from './pages/complete-registration/complete-registration.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'budget',
    component: BudgetComponent,
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
  {
    path: 'chat-funcionario',
    component: ChatFuncionarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'complete-registration',
    component: CompleteRegistrationComponent,
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
