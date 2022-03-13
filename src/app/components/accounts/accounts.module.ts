//leaves.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-pasword/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReCaptchaModule } from 'angular-recaptcha3';


@NgModule({
  declarations: [
    AccountsComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
    AccountsRoutingModule,    
  //   ReCaptchaModule.forRoot({
  //     invisible: {
  //         sitekey: '6LeSgIUcAAAAAN4z7ymjnfXp98oAxFd5p8UxaYB8', 
  //     },
  //     normal: {
  //         sitekey: '6LeSgIUcAAAAAN4z7ymjnfXp98oAxFd5p8UxaYB8', 
  //     },
  //     language: 'en'
  // }),
  ]
})
export class AccountsModule { }
