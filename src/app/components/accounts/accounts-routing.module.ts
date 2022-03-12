//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { AccountsComponent } from './accounts.component';
import { ForgotPasswordComponent } from './forgot-pasword/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: '', component: AccountsComponent, children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'signup', component: SignUpComponent
      },
      {
        path: 'forgotpassword', component: ForgotPasswordComponent
      },
      {
        path: 'changepassword', component: ChangePasswordComponent
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
