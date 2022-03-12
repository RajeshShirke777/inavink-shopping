import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
//import { Observable }    from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ForgotPasswordRequest, ResetPasswordRequest } from 'src/app/shared/requests/account-request';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {
step:number=1;
    formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router , 
    private accountService:AccountService,
    private titleService: Title,
    private metaTagService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle('Buy Online from Local Shops Near you | Vocal for Local | Near Me');
    this.metaTagService.updateTag(
      { name: 'keywords', content: 'Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal' });   
    this.metaTagService.updateTag(    
      { name: 'title', content: 'Buy Online from Local Shops Near you | Vocal for Local | Near Me' });   
    this.metaTagService.updateTag(
      { name: 'description', content: 'Be Vocal for Local, now checkout and Shop Online from Local Shops near me. One of the Best of India Shopping site to support Local stores'  });
    this.metaTagService.updateTag(
      { name:  'robots', content: 'index, follow' });
    this.metaTagService.updateTag(
      { name: 'author', content: 'InAVink' });
    this.metaTagService.updateTag(
      { name: 'viewport',  content: 'width=device-width, initial-scale=1' });    
    this.metaTagService.updateTag(
      { name: 'date', content: '2021-03-18', scheme: 'YYYY-MM-DD'}); 
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', [Validators.required,Validators.email]],
      'otp': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  getError(el) {
    switch (el) {
      case 'username':
        if (this.formGroup.get('username').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'otp':
        if (this.formGroup.get('otp').hasError('required')) {
          return 'OTP required';
        }
        break;
      case 'password':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit(post) {
    let forgotPasswordRequest: ForgotPasswordRequest=null;
    let resetPasswordRequest: ResetPasswordRequest=null;
      if(this.step == 1){
        
    if(this.formGroup.get('username').valid){
        forgotPasswordRequest={
          email:post.username
        }

        this.accountService.forgotPassword(forgotPasswordRequest)
      .subscribe(
      data => {
          if(data.status == "Success"){
              this.step=2;
              this.snackBar.open("OTP sent to your registered email id.", '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });              
          }
          else{
              this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
            
          }
        });       
    
      }
      else{
        this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      }
    }
    else{
      
    if(this.formGroup.get('otp').valid && this.formGroup.get('password').valid){
        resetPasswordRequest={
          email:post.username,
          otp:post.otp,
          newpassword:post.password
        }

        this.accountService.resetPassword(resetPasswordRequest)
      .subscribe(
      data => {
        if(data.status == "success"){            
            this.snackBar.open(data.msg, '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
            this.router.navigate(['/accounts/login']);
        }
        else{
            this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });                
        }
        });
             
    
      }
      else{
        this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      }
    }
  }
}