import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart-item';
import { baseProductURL } from 'src/app/shared/baseurl';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  BaseProductImageUrl=baseProductURL;
  public cartItems : Observable<CartItem[]> = of([]);
  public selectedItem:CartItem;
  public shoppingCartItems  : CartItem[] = [];

  constructor(private cartService: CartService,
    private titleService: Title,
    private metaTagService: Meta,
    public dialog: MatDialog) { }

    openDialog(item:CartItem): void {
      this.selectedItem=item;
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: ""
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - ' + result);
        if(result=='yes'){
          this.removeItem(this.selectedItem);
        };
      });
    }

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
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);

  }


    // Remove cart items
    public removeItem(item: CartItem) {
      this.cartService.removeFromCart(item);
    }


   // Increase Product Quantity
   public increment(product: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(product,quantity);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
   // Get Total
   public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

}
