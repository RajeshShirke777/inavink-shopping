import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { baseProductURL } from 'src/app/shared/baseurl';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  BaseProductImageUrl=baseProductURL;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
 @Input() product: Product;

  constructor(private cartService: CartService, public productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router ) { }

  ngOnInit() {
  }

     // Add to cart
     public addToCart(product: Product,  quantity: number = 1) {
      this.cartService.addToCart(product,quantity);
      console.log(product, quantity);
    }

    // Add to wishlist
    public addToWishlist(product: Product) {
      this.wishlistService.addToWishlist(product);
   }

    // Add to compare
    public addToCompare(product: Product) {
      //this.productsService.addToCompare(product);
   }


  public openProductDialog(product){
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products/details', product.id, product.name]);
      }
    });
  }

}
