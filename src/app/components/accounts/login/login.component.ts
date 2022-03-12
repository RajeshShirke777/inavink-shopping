import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
//import { Observable }    from 'rxjs/Observable';
import { AccountService } from 'src/app/services/account.service';
import { LoginRequest } from 'src/app/shared/requests/account-request';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    formGroup: FormGroup;
  returnUrl: any;
  hide = true;
  constructor(private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router , 
    private route: ActivatedRoute,
    private accountService:AccountService,
    private sharedService:SharedService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    private customValidator: CustomValidationService,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.titleService.setTitle('Buy Online from Local Shops Near you | Vocal for Local | Near Me');
    this.metaTagService.updateTag(
      { name: 'keywords', content: 'InAVink Login, Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal' });   
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
    //  this.metaTagService.addTags([     
    //   { name: 'keywords', content: 'Login SEO' },
    //   { name: 'title', content: 'Login SEO' },      
    //   { name: 'description', content: 'Login SEO' },      
    //   { name: 'robots', content: 'Login SEO' },
    //   { name: 'author', content: 'Login SEO' },
    //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //   { name: 'date', content: '2021-03-18', scheme: 'YYYY-MM-DD' },
    //   { charset: 'UTF-8' }
    // ]);
    // this.metaTagService.updateTag({ name: 'keywords', content: 'Login SEO' });      
    // this.metaTagService.updateTag( { name: 'title', content: 'Login SEO' });      
    // this.metaTagService.updateTag( { name: 'description', content: 'Login SEO' });      
    // this.metaTagService.updateTag(  { name: 'robots', content: 'Login SEO' });
    
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.email]],
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

    if (isPlatformBrowser(this.platformId)) {
    if(this.formGroup.valid){
    var spinnerRef = this.spinnerService.start(); 
    let loginRequest:LoginRequest={
      email:post.username,
      password:post.password,
    }
    this.accountService.login(loginRequest)
    .subscribe(
     data => {
        if(data.status == "success"){
          
            localStorage.setItem("user", JSON.stringify(data.user));
          
          this.sharedService.sharingLoginData.next(true);
          this.snackBar.open("Login Successful", '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
          this.router.navigateByUrl(this.returnUrl);
          //this.router.navigate(['/home/two']);
      
        }
        else{
          var status = 'error';
          this.snackBar.open("Invalid credentials!", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
        }
        
      this.spinnerService.stop(spinnerRef);
      });
    }
    else{
      this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
    }
  }
  }
}