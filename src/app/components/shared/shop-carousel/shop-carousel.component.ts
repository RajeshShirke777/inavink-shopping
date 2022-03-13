import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Merchant } from 'src/app/shared/models/merchant';
import {  SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { baseShopImageURL } from 'src/app/shared/baseurl';

@Component({
  selector: 'app-shop-carousel',
  templateUrl: './shop-carousel.component.html',
  styleUrls: ['./shop-carousel.component.scss']
})
export class ShopCarouselComponent implements OnInit {
  BaseShopImageURL=baseShopImageURL;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('merchant') merchant: Array<Merchant> = [];
  public config: SwiperConfigInterface = {};
  contentLoaded = false;
  constructor(private dialog: MatDialog, private router: Router, private cartService: CartService, private productService: ProductService, private wishlistService: WishlistService) { }

  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }
  ngAfterViewInit(){ 
    this.config = {
      observer: true,
      autoplay:true,      
      slidesPerView: 5,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },


      }
    }
  }


  // public openShopDialog(product){
  //   let dialogRef = this.dialog.open(ProductDialogComponent, {
  //       data: product,
  //       panelClass: 'product-dialog',
  //   });
  //   dialogRef.afterClosed().subscribe(product => {
  //     if(product){
  //       this.router.navigate(['/products', product.id, product.name]);
  //     }
  //   });
  // }

   // Add to cart
  //  public addToCart(product: Product,  quantity: number = 1) {
  //   this.cartService.addToCart(product,quantity);
  //   console.log(product, quantity);
  // }

   // Add to wishlist
//    public addToWishlist(product: Product) {
//     this.wishlistService.addToWishlist(product);
//  }

    // Add to compare
  //   public addToCompare(product: Product) {
  //     this.productService.addToCompare(product);
  //  }
}



