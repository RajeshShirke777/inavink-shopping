import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//import { Observable }    from 'rxjs/Observable';
import { SignUpRequest } from 'src/app/shared/requests/account-request';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { Meta, Title } from '@angular/platform-browser';
//import { ReCaptchaService } from 'angular-recaptcha3';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent {
step:number=1;
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

    formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router , 
    private accountService:AccountService,
    private titleService: Title,
    private metaTagService: Meta,
    private customValidator:CustomValidationService,
    //private recaptchaService: ReCaptchaService
    
    
    ) { }

  ngOnInit() {
    
    this.titleService.setTitle('Buy Online from Local Shops Near you | Vocal for Local | Near Me');
    this.metaTagService.updateTag(
      { name: 'keywords', content: 'InAVink SignUp, Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal' });   
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
      'username': ['', Validators.required],
      'password': ['', [Validators.required, Validators.pattern(this.pattern)]],
      'emailid': ['', [Validators.required, Validators.email]],
      'mobileno': ['', Validators.compose([Validators.required, this.customValidator.mobileNoValidator()])],
      'otp': ['', Validators.compose([Validators.required, this.customValidator.otpValidator()])],
    });
  }

  getError(el) {
    switch (el) {
      case 'username':
        if (this.formGroup.get('username').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'password':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      case 'emailid':
        if (this.formGroup.get('emailid').hasError('required')) {
          return 'Email id required';
        }
        break;
      case 'mobileno':
        if (this.formGroup.get('mobileno').hasError('required')) {
          return 'mobile no required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit(post) {
    
    if(this.step == 1){
      if(this.formGroup.get('username').valid && this.formGroup.get('password').valid
      && this.formGroup.get('emailid').valid && this.formGroup.get('mobileno').valid) {

        //this.recaptchaService.execute({action: 'signup'}).then(token => {
          // Backend verification method
          //this.accountService.sendTokenToBackend(token).subscribe(
           // data => {
            
        //console.log(data);
      let signUpRequest:SignUpRequest={
        username:post.username,
        password:post.password,
        emailid:post.emailid,
        mobileno:post.mobileno
      }
      this.accountService.signUp(signUpRequest)
      .subscribe(
      data => {
          if(data.status == "success"){
              this.step=2;
              this.snackBar.open("OTP has been sent to your registed email id", '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
          }
          else{
              this.snackBar.open(data.message, '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
          }
        });
      //});
    //});
      }      
      else{
        this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      }
    }
    else{
      
      if(this.formGroup.get('username').valid && this.formGroup.get('password').valid
      && this.formGroup.get('emailid').valid && this.formGroup.get('mobileno').valid && this.formGroup.get('otp').valid) {
        let signUpRequest:SignUpRequest={
          username:post.username,
          password:post.password,
          emailid:post.emailid,
          mobileno:post.mobileno,
          otp:post.otp
        }
        this.accountService.signUp(signUpRequest)
        .subscribe(
        data => {
            if(data.status == "success"){     
                this.snackBar.open(data.message, '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
                this.router.navigate(['/accounts/login']);
            }
            else{           
                this.snackBar.open(data.message, '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
            }
          });
        }      
        else{
          this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
        }
    }
  
  }
}