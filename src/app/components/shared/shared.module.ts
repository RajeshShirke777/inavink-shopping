import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
//import { AppSettings } from './services/color-option.service'

import { FlexLayoutModule } from '@angular/flex-layout';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { LocationInfoComponent } from './location-info/location-info.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ShoppingWidgetsComponent } from './shopping-widgets/shopping-widgets.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductComponent } from './product/product.component';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ProductCarouselThreeComponent } from './product-carousel-three/product-carousel-three.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ShopComponent } from './shop/shop.component';
import { ShopCarouselComponent } from './shop-carousel/shop-carousel.component';
import { ShopCarouselThreeComponent } from './shop-carousel-three/shop-carousel-three.component';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
// import { MenuComponent } from './menu/menu.component';
// import { OrderByPipe } from './pipes/order-by.pipe';
// import { ProductService } from './services/product.service';
// import { CartService } from './services/cart.service';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { BannersComponent } from './banners/banners.component';
// import { HeaderTwoComponent } from './header-two/header-two.component';
// import { ShoppingWidgetsComponent } from './shopping-widgets/shopping-widgets.component';
// import { HeaderThreeComponent } from './header-three/header-three.component';
// import { BannersFourComponent } from './banners-four/banners-four.component';
// import { BlogSectionComponent } from './blog-section/blog-section.component';
// import { BannerPromotionComponent } from './banner-promotion/banner-promotion.component';
// import { HeaderFourComponent } from './header-four/header-four.component';
// import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
// import { CategoriesSectionComponent } from './categories-section/categories-section.component';
// import { FooterTwoComponent } from './footer-two/footer-two.component';
// import {MatBadgeModule} from '@angular/material/badge';
// import { ShoppingWidgetsTwoComponent } from './shopping-widgets-two/shopping-widgets-two.component';
// import { HeaderFiveComponent } from './header-five/header-five.component';
// import { BlogSectionTwoComponent } from './blog-section-two/blog-section-two.component';
// import { HeaderSixComponent } from './header-six/header-six.component';
// import { ShoppingWidgetsThreeComponent } from './shopping-widgets-three/shopping-widgets-three.component';
// import { HeaderSevenComponent } from './header-seven/header-seven.component';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AlertDialogComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    FooterComponent,
    LocationInfoComponent,
    MainCarouselComponent,
    OrderByPipe,
    ProgressSpinnerComponent,
    ShoppingWidgetsComponent,
    SidebarComponent,    
    ProductComponent,
    ProductCarouselComponent,
    ProductCarouselThreeComponent,
    ProductDialogComponent,
    ShopComponent,
    ShopCarouselComponent,
    ShopCarouselThreeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatSliderModule,
    MatExpansionModule,
    MatBadgeModule,
    MatMenuModule,
    MatTableModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    NgxSkeletonLoaderModule,
    MatProgressSpinnerModule,
    SwiperModule,
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    NgxPaginationModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    SwiperModule,
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    
    AlertDialogComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    FooterComponent,
    LocationInfoComponent,
    MainCarouselComponent,
    OrderByPipe,
    ProgressSpinnerComponent,
    ShoppingWidgetsComponent,
    SidebarComponent,
    ProductComponent,
    ProductCarouselComponent,
    ProductCarouselThreeComponent,
    ProductDialogComponent,
    ShopComponent,
    ShopCarouselComponent,
    ShopCarouselThreeComponent
  ],
  entryComponents: [
    ProgressSpinnerComponent,
    LocationInfoComponent,
    ProductDialogComponent,
    AlertDialogComponent
  ],
  providers: [
    // ProductService,
    // CartService,
    //AppSettings
  ]
})
export class SharedModule {}
