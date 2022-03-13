import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaModule } from 'angular-recaptcha3';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatButtonModule} from '@angular/material/button';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatSelectModule} from '@angular/material/select';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatIconModule} from '@angular/material/icon';
// import {MatCardModule} from '@angular/material/card';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatListModule} from '@angular/material/list';
// import {MatSliderModule} from '@angular/material/slider';
// import {MatInputModule} from '@angular/material/input';
// import {MatDialogModule} from '@angular/material/dialog';
// import { MatTableModule } from '@angular/material/table';
// import {MatBadgeModule} from '@angular/material/badge';
//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//import { SwiperModule } from 'ngx-swiper-wrapper';

//import { NgxSpinnerModule } from "ngx-spinner";
//import { NgxImgZoomModule } from 'ngx-img-zoom';
//import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductService } from './services/product.service';
import { HomeService } from './services/home.service';
import { MerchantService } from './services/merchant.service';
import { SharedService } from './services/shared.service';
import { CustomValidationService } from './services/custom-validation.service';
import { CartService } from './services/cart.service';
import { SpinnerService } from './services/spinner.service';
import { baseBannerURL, baseProductURL, baseShopImageURL, baseURL } from './shared/baseurl';

import { ModalService } from './services/modal.service';
import { ModalComponent } from './components/_modal/modal.component';
import { IRecaptchaOption } from './shared/models/recaptchoption'
import { SharedModule } from './components/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppSettings } from './services/color-option.service';

// const RECAPTCHA_OPTION = {
//   language?: string;
//   invisible?: IRecaptchaOption;
//   normal?: IRecaptchaOption;
// }



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    HomeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),    
    FlexLayoutModule.withConfig({ssrObserveBreakpoints: ['xs', 'lt-md']}),
  //   ReCaptchaModule.forRoot({
  //     invisible: {
  //         sitekey: '6LeSgIUcAAAAAN4z7ymjnfXp98oAxFd5p8UxaYB8', 
  //     },
  //     normal: {
  //         sitekey: '6LeSgIUcAAAAAN4z7ymjnfXp98oAxFd5p8UxaYB8', 
  //     },
  //     language: 'en'
  // }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNSfDuFx6KHTrx2MyfLP6JIJ1l3wOJCaQ',
      libraries: ['places', 'geometry']
    }),    
    MatGoogleMapsAutocompleteModule,
  ],
  providers: [
    AppSettings,
    Meta,
    ProductService,
    HomeService,
    MerchantService,
    SharedService,
    CustomValidationService,
    SpinnerService,
    CartService,
    ModalService,
    //GoogleMapsAPIWrapper,
    {provide:'baseURL', useValue:baseURL},
    {provide:'baseBannerURL', useValue:baseBannerURL},
    {provide:'baseProductURL', useValue:baseProductURL},
    {provide:'baseShopImageURL', useValue:baseShopImageURL},],
  bootstrap: [AppComponent]
})


export class AppModule { }
