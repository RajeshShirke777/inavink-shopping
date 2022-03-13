import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart-item';
import { OrderService } from 'src/app/services/order.service';
import { baseProductURL } from 'src/app/shared/baseurl';
import { ProductOrderItemView, ProductOrderView } from 'src/app/shared/models/order-view';
import { OrderListRequest, OrderHistoryRequest, CancelOrderRequest } from 'src/app/shared/requests/order-request';
import { CartService } from 'src/app/services/cart.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SharedService } from 'src/app/services/shared.service';
import { Meta, Title } from '@angular/platform-browser';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})

export class OrderDetailsComponent implements OnInit {
  orderHistoryRequest:OrderHistoryRequest;
  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = '';   // sorting
  public page:any;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  //public filterForm: FormGroup;
  //public colorFilters :   ColorFilter[] = [];

  //public items        :   Product[] = [];
  //public allItems: Product[] = [];
  //public products: Product[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];

  BaseProductImageUrl=baseProductURL;
  orderlistRequest:OrderListRequest;
  public shoppingCartItems  : CartItem[] = [];
  user: any;
  productOrder: any;
  order_code:number;
  cust_googleMapUrl: string;
  shop_googleMapUrl: string;
  constructor(private route: ActivatedRoute,
    private sharedService: SharedService,
    private orderService:OrderService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    private metaTagService: Meta,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object) { 
      if (isPlatformBrowser(this.platformId)) {
      
      var userData = localStorage.getItem("user") ;
      if(userData === null || userData === undefined || userData === "undefined"){
        
        this.router.navigate(['/accounts/login'], { queryParams: { returnUrl: '/checkout' }});
      }
      else{
        this.user = JSON.parse(localStorage.getItem("user")) ;
        console.log(this.user);
        //this.userId=user.id;
      }
      this.route.params.subscribe(params => {
        this.order_code = +params['id'];
        console.log(this.order_code);
      });

    }
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
    if (isPlatformBrowser(this.platformId)) {
      this.productOrder = this.sharedService.data;
        //this.sharedService.data = undefined; 
        this.viewProductOrderDetails();
    //this.cartItems = this.cartService.getItems();
    //this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    }
  }
  viewProductOrderDetails(){
    
    var spinnerRef = this.spinnerService.start(); 
    this.orderHistoryRequest={
      order_id:this.order_code
    }
    this.orderService.getOrderHistoryDetails(this.orderHistoryRequest).subscribe(data => {
      
      this.spinnerService.stop(spinnerRef);
      this.productOrder = data.productOrder;
      this.cust_googleMapUrl="https://www.google.com/maps/place/" + data.productOrder.latitude + "," + data.productOrder.longitude;
      this.shop_googleMapUrl="https://www.google.com/maps/place/" + data.productOrder.merchant_latitude + "," + data.productOrder.merchant_longitude;
    })
  }
  
  cancelProductOrder(){
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      let cancelOrderRequest:CancelOrderRequest={
        order_id:this.productOrder.order_id
      }
      if(result=='yes'){
        
          var spinnerRef = this.spinnerService.start(); 
        this.orderService.cancelOrder(cancelOrderRequest).subscribe(data => {
          
          this.spinnerService.stop(spinnerRef);
          if(data.status =="success"){
          this.viewProductOrderDetails();
          this.snackBar.open(data.msg, '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
          
          }
          else{
            this.snackBar.open(data.msg, '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });

          }
        });
      };
    });
  }
  cancelProductOrderItem(item:ProductOrderItemView){
    
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      let cancelOrderRequest:CancelOrderRequest={
        order_id:item.id
      }
      console.log('The dialog was closed - ' + result);
      if(result=='yes'){
        
          var spinnerRef = this.spinnerService.start(); 
        this.orderService.cancelOrderItem(cancelOrderRequest).subscribe(data => {
          
          this.spinnerService.stop(spinnerRef);
          if(data.status =="success"){
          this.viewProductOrderDetails();
          this.snackBar.open(data.msg, '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
          
          }
          else{
            this.snackBar.open(data.msg, '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });

          }
        });
      };
    });
  }
}
