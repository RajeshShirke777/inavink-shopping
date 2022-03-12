import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Observable }    from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ForgotPasswordRequest, ResetPasswordRequest } from 'src/app/shared/requests/account-request';
import { Meta, Title } from '@angular/platform-browser';
//import { ReCaptchaService } from 'angular-recaptcha3';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent {
step:number=1;
    formGroup: FormGroup;
    hide = true;
    passRequirement = {
      passwordMinLowerCase: 1,
      passwordMinNumber: 1,
      passwordMinSymbol: 1
      
      ,
      passwordMinUpperCase: 1,
      passwordMinCharacters: 8,
    };
    pattern = [
      `(?=([^a-z]*[a-z])\{${this.passRequirement.passwordMinLowerCase},\})`,
      `(?=([^A-Z]*[A-Z])\{${this.passRequirement.passwordMinUpperCase},\})`,
      `(?=([^0-9]*[0-9])\{${this.passRequirement.passwordMinNumber},\})`,
      `(?=(\.\*[\$\@\$\!\%\*\?\&])\{${this.passRequirement.passwordMinSymbol},\})`,
      `[A-Za-z\\d\$\@\$\!\%\*\?\&\.]{${this.passRequirement.passwordMinCharacters},}`,
    ].map((item) => item.toString())
    .join('');

  constructor(private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router , 
    private accountService:AccountService,
    private titleService: Title,
    private metaTagService: Meta,
    //private recaptchaService: ReCaptchaService
    ) { }

  ngOnInit() {

    this.titleService.setTitle('Buy Online from Local Shops Near you | Vocal for Local | Near Me');
    this.metaTagService.updateTag(
      { name: 'keywords', content: 'InAVink Forgot Password, Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal' });   
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
      'password': ['', [Validators.required, Validators.pattern(this.pattern)]],
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

      
      //this.recaptchaService.execute({action: 'forgotpassword'}).then(token => {
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
              this.snackBar.open(data.msg, '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
            
          }
        });       
    
      //}); 
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
            this.snackBar.open(data.msg, '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });                
        }
        });
             
    
      }
      else{
        this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      }
    }
  }
}