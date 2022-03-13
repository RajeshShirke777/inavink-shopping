import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart-item';
import { OrderService } from 'src/app/services/order.service';
import { baseProductURL } from 'src/app/shared/baseurl';
import { ProductOrderView } from 'src/app/shared/models/order-view';
import { OrderListRequest } from 'src/app/shared/requests/order-request';
import { CartService } from 'src/app/services/cart.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SharedService } from 'src/app/services/shared.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

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
  productOrders: ProductOrderView[]=[];

  constructor(
    private sharedService:SharedService, 
    private orderService:OrderService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    private metaTagService: Meta,
    private router: Router,
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
    this.serachOrders();
    //this.cartItems = this.cartService.getItems();
    //this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);

  }
  viewOrder(order){
    this.sharedService.data=order;
  }

  serachOrders(){

    var spinnerRef = this.spinnerService.start(); 
    this.orderlistRequest = {
      cust_id:this.user.id
    }

    this.orderService.getOrderList(this.orderlistRequest).subscribe(data => {
      this.productOrders = data.productOrders;
      
      this.spinnerService.stop(spinnerRef);
      });
  }
  cancelProductOrder(item){
  }
  public onPageChanged(event){
    
    if (isPlatformBrowser(this.platformId)) {
    this.page = event;
    this.productOrders;
    window.scrollTo(0,0);
    }
  }
  


    

}
