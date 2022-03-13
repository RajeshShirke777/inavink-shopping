import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { baseShopImageURL } from 'src/app/shared/baseurl';
import { Merchant } from 'src/app/shared/models/merchant';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  BaseShopImageUrl=baseShopImageURL;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
 @Input() merchant: Merchant;

  constructor(private cartService: CartService, public productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router ) { }

  ngOnInit() {
  }

  //    // Add to cart
  //    public addToCart(product: Product,  quantity: number = 1) {
  //     this.cartService.addToCart(product,quantity);
  //     console.log(product, quantity);
  //   }

  //   // Add to wishlist
  //   public addToWishlist(product: Product) {
  //     this.wishlistService.addToWishlist(product);
  //  }

  //   // Add to compare
  //   public addToCompare(product: Product) {
  //     this.productsService.addToCompare(product);
  //  }


  // public openProductDialog(product){
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

}
